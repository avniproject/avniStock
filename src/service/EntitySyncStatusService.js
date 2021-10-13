import Service from '../framework/bean/Service';
import BaseService from './BaseService';
import General from '../utility/General';
import _ from 'lodash';
import EntityQueueService from './EntityQueueService';
import moment from 'moment';
import EntitySyncStatus from '../models/EntitySyncStatus';
import EntityMetaData from '../models/EntityMetaData';

@Service('entitySyncStatusService')
class EntitySyncStatusService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
    this.get = this.get.bind(this);
  }

  findAll() {
    return super.findAll(this.getSchema());
  }

  getSchema() {
    return EntitySyncStatus.schema.name;
  }

  get(entityName, entityTypeUuid) {
    return this.db
      .objects(EntitySyncStatus.schema.name)
      .filtered('entityName = $0', entityName)
      .filtered(
        _.isEmpty(entityTypeUuid) ? 'uuid<>null' : 'entityTypeUuid = $0',
        entityTypeUuid,
      )
      .slice()[0];
  }

  getAllByEntityName(entityName, entityTypeUuid) {
    return this.db
      .objects(EntitySyncStatus.schema.name)
      .filtered('entityName = $0', entityName)
      .filtered(
        _.isEmpty(entityTypeUuid) ? 'uuid<>null' : 'entityTypeUuid = $0',
        entityTypeUuid,
      );
  }

  findAllByUniqueEntityName() {
    return this.findAll().filtered('TRUEPREDICATE DISTINCT(entityName)');
  }

  geAllSyncStatus() {
    const entityQueueService = this.getService(EntityQueueService);
    return _.map(
      this.findAllByUniqueEntityName(),
      ({entityName, loadedSince}) => {
        const isNeverSynced =
          loadedSince.getTime() === EntitySyncStatus.REALLY_OLD_DATE.getTime();
        return {
          entityName: entityName,
          loadedSince: isNeverSynced
            ? 'Never'
            : moment(loadedSince).format('DD-MM-YYYY HH:MM:SS'),
          queuedCount: entityQueueService.getQueuedItemCount(entityName),
          type: EntityMetaData.findByName(entityName).type,
        };
      },
    );
  }

  getLastLoaded() {
    return moment(
      _.max(
        this.findAll(EntitySyncStatus.schema.name).map(
          entitySyncStatus => entitySyncStatus.loadedSince,
        ),
      ),
    ).format('DD-MM-YYYY HH:MM:SS');
  }

  setup(entityMetaDataModel) {
    const self = this;

    entityMetaDataModel.forEach(function (entity) {
      if (
        _.isNil(self.get(entity.entityName)) &&
        _.isEmpty(entity.privilegeParam)
      ) {
        General.logDebug(
          'EntitySyncStatusService',
          `Setting up base entity sync status for ${entity.entityName}`,
        );
        try {
          const entitySyncStatus = EntitySyncStatus.create(
            entity.entityName,
            EntitySyncStatus.REALLY_OLD_DATE,
            General.randomUUID(),
            '',
          );
          self.save(entitySyncStatus);
        } catch (e) {
          General.logError(
            'EntitySyncStatusService',
            `${entity.entityName} failed`,
          );
          throw e;
        }
      }
    });
  }

  getTotalEntitiesPending() {
    return _.sum(
      this.geAllSyncStatus()
        .filter(s => s.entityName !== 'SyncTelemetry')
        .map(s => s.queuedCount),
    );
  }

  updateAsPerSyncDetails(entitySyncStatuses) {
    _.forEach(
      entitySyncStatuses,
      ({uuid, entityName, loadedSince, entityTypeUuid}) => {
        const entitySyncStatus = EntitySyncStatus.create(
          entityName,
          loadedSince,
          uuid,
          entityTypeUuid,
        );
        this.saveOrUpdate(entitySyncStatus);
      },
    );
  }
}

export default EntitySyncStatusService;
