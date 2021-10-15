import Realm from 'realm';

class EntityQueue extends Realm.Object {
  static create(entity, schema, savedAt = new Date()) {
    return {
      entityUUID: entity.uuid,
      entity: schema,
      savedAt: savedAt,
    };
  }
}
EntityQueue.schema = {
  name: 'EntityQueue',
  properties: {
    savedAt: 'date',
    entityUUID: 'string',
    entity: 'string',
  },
};

export default EntityQueue;
