import Service from '../framework/bean/Service';
import BaseService from './BaseService';
import _ from 'lodash';
import EntityQueue from '../models/EntityQueue';

@Service('entityService')
class EntityService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    throw 'Should not call getSchema on Entity Service';
  }

  deleteObjects(uuid, schema, objectKey) {
    const db = this.db;
    this.db.write(() => {
      const savedFormElement = this.findByKey('uuid', uuid, schema);
      if (!_.isNil(savedFormElement)) {
        db.delete(savedFormElement[objectKey]);
      }
    });
  }

  saveAndPushToEntityQueue(entity, schema) {
    this.db.write(() => {
      this.db.create(schema, entity, true);
      this.db.create(
        EntityQueue.schema.name,
        EntityQueue.create(entity, schema),
      );
    });
  }

  deleteAll(entities) {
    const db = this.db;
    _.forEach(entities, entity => db.write(() => db.delete(entity)));
  }
}

export default EntityService;
