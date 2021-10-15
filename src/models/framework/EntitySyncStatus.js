import Realm from 'realm';

class EntitySyncStatus extends Realm.Object {
  static REALLY_OLD_DATE = new Date('1900-01-01');

  static create(entityName, date, uuid, entityTypeUuid) {
    return {
      uuid: uuid,
      entityName: entityName,
      loadedSince: date,
      entityTypeUuid: entityTypeUuid,
    };
  }
}

EntitySyncStatus.schema = {
  name: 'EntitySyncStatus',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    entityName: 'string',
    loadedSince: 'date',
    entityTypeUuid: 'string',
  },
};

export default EntitySyncStatus;
