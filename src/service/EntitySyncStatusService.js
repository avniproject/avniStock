import Service from '../framework/bean/Service';
import BaseService from './BaseService';
import General from '../utility/General';
import _ from 'lodash';
import EntityQueueService from './EntityQueueService';
import moment from 'moment';
import EntitySyncStatus from '../models/framework/EntitySyncStatus';
import EntityMetaData from '../models/framework/EntityMetaData';

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
