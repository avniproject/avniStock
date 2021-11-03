import Service from '../framework/bean/Service';
import ConventionalRestClient from './rest/ConventionalRestClient';
import BaseService from './BaseService';
import EntityService from './EntityService';
import EntitySyncStatusService from './EntitySyncStatusService';
import SettingsService from './SettingsService';
import EntityMetaData from '../models/framework/EntityMetaData';
import EntitySyncStatus from '../models/framework/EntitySyncStatus';
import EntityQueueService from './EntityQueueService';
import ProgressbarStatus from './ProgressbarStatus';
import _ from 'lodash';
import {post} from '../framework/http/requests';
import General from '../utility/General';

@Service('syncService')
class SyncService extends BaseService {
  constructor(db, context) {
    super(db, context);
    this.persistAll = this.persistAll.bind(this);
  }

  getFormattedMetadata(metadata, reduceWeightBy) {
    return _.map(metadata, data => ({
      name: data.entityName,
      syncWeight: data.syncWeight / reduceWeightBy,
    }));
  }

  init() {
    this.entitySyncStatusService = this.getService(EntitySyncStatusService);
    this.entityService = this.getService(EntityService);
    this.conventionalRestClient = new ConventionalRestClient(
      this.getService(SettingsService),
    );
    this.entityQueueService = this.getService(EntityQueueService);
  }

  getProgressSteps(allEntitiesMetaData) {
    const allReferenceDataMetaData = allEntitiesMetaData.filter(
      entityMetaData => entityMetaData.type === 'reference',
    );
    const allTxEntityMetaData = allEntitiesMetaData.filter(
      entityMetaData => entityMetaData.type === 'tx',
    );
    //entities will be used once during sync
    const txMetaData = this.getFormattedMetadata(allTxEntityMetaData, 1);
    const queuedItems = allTxEntityMetaData
      .map(this.entityQueueService.getAllQueuedItems)
      .filter(entities => !_.isEmpty(entities.entities))
      .map(it => ({name: it.metaData.entityName}));
    //entities will be used twice during sync
    const entityQueueData = _.map(
      _.intersectionBy(txMetaData, queuedItems, 'name'),
      data => ({
        name: data.name,
        syncWeight: data.syncWeight / 2,
      }),
    );
    return _.concat(
      this.getFormattedMetadata(allReferenceDataMetaData, 1),
      entityQueueData,
      _.differenceBy(txMetaData, entityQueueData, 'name'),
    );
  }

  sync(allEntitiesMetaData, trackProgress, statusMessageCallBack = _.noop) {
    const progressBarStatus = new ProgressbarStatus(
      trackProgress,
      this.getProgressSteps(allEntitiesMetaData),
    );
    const onProgressPerEntity = (entityType, numOfPages) => {
      progressBarStatus.onComplete(entityType, numOfPages);
    };

    return this.dataServerSync(
      allEntitiesMetaData,
      statusMessageCallBack,
      onProgressPerEntity,
      _.noop,
    ).then(() => Promise.resolve(progressBarStatus.onSyncComplete()));
  }

  getMetadataByType(entityMetadata, type) {
    return entityMetadata.filter(
      entityMetaData => entityMetaData.type === type,
    );
  }

  async dataServerSync(
    allEntitiesMetaData,
    statusMessageCallBack,
    onProgressPerEntity,
    onAfterMediaPush,
  ) {
    const serverURL = this.getService(SettingsService).getSettings().serverURL;
    const entitySyncStatus = this.entitySyncStatusService
      .findAll()
      .map(_.identity);
    const allTxEntityMetaData = this.getMetadataByType(
      allEntitiesMetaData,
      'tx',
    );
    const {syncDetails, now, nowMinus10Seconds} = await Promise.resolve(
      statusMessageCallBack('uploadingData'),
    )
      .then(() =>
        this.pushData(allTxEntityMetaData.slice(), onProgressPerEntity),
      )
      .then(() => onAfterMediaPush('After_Media', 0))
      .then(() => statusMessageCallBack('fetchingChangedResources'))
      .then(() => post(`${serverURL}/syncDetails`, entitySyncStatus, true))
      .then(res => res.json());

    const filteredSyncDetails = _.intersectionBy(
      syncDetails,
      allEntitiesMetaData,
      'entityName',
    );
    const filteredMetadata = _.filter(allEntitiesMetaData, ({entityName}) =>
      _.find(filteredSyncDetails, sd => sd.entityName === entityName),
    );
    const filteredRefData = this.getMetadataByType(
      filteredMetadata,
      'reference',
    );
    const filteredTxData = this.getMetadataByType(filteredMetadata, 'tx');
    General.logDebug(
      'SyncService',
      `Entities to sync ${_.map(
        filteredSyncDetails,
        ({entityName, entityTypeUuid}) => [entityName, entityTypeUuid],
      )}`,
    );
    this.entitySyncStatusService.updateAsPerSyncDetails(filteredSyncDetails);

    return Promise.resolve(statusMessageCallBack('downloadingForms'))
      .then(() => this.getRefData(filteredRefData, onProgressPerEntity, now))

      .then(() => statusMessageCallBack('downloadingNewData'))
      .then(() =>
        this.getTxData(
          filteredTxData,
          onProgressPerEntity,
          filteredSyncDetails,
          nowMinus10Seconds,
        ),
      );
  }

  getRefData(entitiesMetadata, afterEachPagePulled, now) {
    const entitiesMetaDataWithSyncStatus = entitiesMetadata
      .reverse()
      .map(entityMetadata =>
        _.assignIn(
          {
            syncStatus: this.entitySyncStatusService.get(
              entityMetadata.entityName,
            ),
          },
          entityMetadata,
        ),
      );
    return this.getData(
      entitiesMetaDataWithSyncStatus,
      afterEachPagePulled,
      now,
    );
  }

  getTxData(entitiesMetadata, afterEachPagePulled, syncDetails, now) {
    const entitiesMetaDataWithSyncStatus = entitiesMetadata
      .reverse()
      .map(entityMetadata => {
        const entitiesToSync = _.filter(
          syncDetails,
          ({entityName}) => entityMetadata.entityName === entityName,
        );
        return _.reduce(
          entitiesToSync,
          (acc, m) => {
            acc.push(_.assignIn({syncStatus: m}, entityMetadata));
            return acc;
          },
          [],
        );
      })
      .flat(1);
    return this.getData(
      entitiesMetaDataWithSyncStatus,
      afterEachPagePulled,
      now,
    );
  }

  getData(entitiesMetaDataWithSyncStatus, afterEachPagePulled, now) {
    return this.conventionalRestClient.getAll(
      entitiesMetaDataWithSyncStatus,
      this.persistAll,
      _.noop,
      afterEachPagePulled,
      now,
    );
  }

  associateParent(entityResources, entities, entityMetaData) {
    const parentEntities = _.zip(entityResources, entities).map(
      ([entityResource, entity]) =>
        entityMetaData.parent.entityClass.associateChild(
          entity,
          entityMetaData.entityClass,
          entityResource,
          this.entityService,
        ),
    );
    return _.values(_.groupBy(parentEntities, 'uuid')).map(
      entityMetaData.parent.entityClass.merge(entityMetaData.entityClass),
    );
  }

  persistAll(entityMetaData, entityResources) {
    if (_.isEmpty(entityResources)) {
      return;
    }
    entityResources = _.sortBy(entityResources, 'lastModifiedDateTime');
    const entities = entityResources.reduce(
      (acc, resource) =>
        acc.concat([
          entityMetaData.entityClass.fromResource(
            resource,
            this.entityService,
            entityResources,
          ),
        ]),
      [],
    );
    let entitiesToCreateFns = this.createEntities(
      entityMetaData.entityName,
      entities,
    );
    //most avni-models are designed to have oneToMany relations
    //Each model has a static method `associateChild` implemented in manyToOne fashion
    //`<A Model>.associateChild()` method takes childInformation, finds the parent, assigns the child to the parent and returns the parent
    //`<A Model>.associateChild()` called many times as many children
    if (!_.isEmpty(entityMetaData.parent)) {
      const mergedParentEntities = this.associateParent(
        entityResources,
        entities,
        entityMetaData,
      );
      entitiesToCreateFns = entitiesToCreateFns.concat(
        this.createEntities(
          entityMetaData.parent.entityName,
          mergedParentEntities,
        ),
      );
    }

    const currentEntitySyncStatus = this.entitySyncStatusService.get(
      entityMetaData.entityName,
      entityMetaData.syncStatus.entityTypeUuid,
    );

    const entitySyncStatus = {
      entityName: entityMetaData.entityName,
      entityTypeUuid: entityMetaData.syncStatus.entityTypeUuid,
      uuid: currentEntitySyncStatus.uuid,
      loadedSince: new Date(_.last(entityResources).lastModifiedDateTime),
    };
    this.bulkSaveOrUpdate(
      entitiesToCreateFns.concat(
        this.createEntities(EntitySyncStatus.schema.name, [entitySyncStatus]),
      ),
    );
  }

  pushData(allTxEntityMetaData, afterEachEntityTypePushed) {
    const entitiesToPost = allTxEntityMetaData
      .reverse()
      .map(this.entityQueueService.getAllQueuedItems)
      .filter(entities => !_.isEmpty(entities.entities));

    const onCompleteOfIndividualPost = (entityMetadata, entityUUID) => {
      return () => {
        return this.entityQueueService.popItem(entityUUID)();
      };
    };

    return this.conventionalRestClient.postAllEntities(
      entitiesToPost,
      onCompleteOfIndividualPost,
      afterEachEntityTypePushed,
    );
  }

  clearData() {
    this.entityService.clearDataIn(EntityMetaData.entitiesLoadedFromServer());
    this.entitySyncStatusService.setup(EntityMetaData.model());
  }
}

export default SyncService;
