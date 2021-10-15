import _ from 'lodash';
import {ErrorCodes} from '../../service/error/ErrorCodes';
import SyncError from '../../service/error/SyncError';
import ValidationResult from './ValidationResult';
import ResourceUtil from '../utility/ResourceUtil';

class BaseEntity {
  static mergeOn(key) {
    return entities => {
      return entities.reduce((acc, entity) => {
        let existingChildren = acc[key];
        entity[key].forEach(child =>
          BaseEntity.addNewChild(child, existingChildren),
        );
        entity[key] = existingChildren;
        return entity;
      });
    };
  }

  static addNewChild(newChild, existingChildren) {
    if (!BaseEntity.collectionHasEntity(existingChildren, newChild)) {
      existingChildren.push(newChild);
    }
  }

  static collectionHasEntity(collection, entity) {
    return _.some(collection, item => item.uuid === entity.uuid);
  }

  static removeFromCollection(collection, entity) {
    _.remove(collection, item => item.uuid === entity.uuid);
  }

  equals(other) {
    return !_.isNil(other) && other.uuid === this.uuid;
  }

  validateFieldForEmpty(value, key) {
    if (value instanceof Date) {
      return _.isNil(value)
        ? ValidationResult.failure(key, 'emptyValidationMessage')
        : ValidationResult.successful(key);
    }
    return _.isEmpty(value)
      ? ValidationResult.failure(key, 'emptyValidationMessage')
      : ValidationResult.successful(key);
  }

  validateFieldForNull(value, key) {
    return _.isNil(value)
      ? ValidationResult.failure(key, 'emptyValidationMessage')
      : ValidationResult.successful(key);
  }

  print() {
    return this.toString();
  }

  static getParentEntity(
    entityService,
    childEntityClass,
    childResource,
    parentUUIDField,
    parentSchema,
  ) {
    const childUuid = childResource.uuid;
    const parentUuid = ResourceUtil.getUUIDFor(childResource, parentUUIDField);
    const childSchema = childEntityClass.schema.name;
    const parent = entityService.findByKey('uuid', parentUuid, parentSchema);
    if (!_.isNil(parent)) {
      return parent;
    }
    const errorCodeKey = `${childSchema}-${parentSchema}-Association`;
    throw new SyncError(
      ErrorCodes[errorCodeKey],
      `${childSchema}{uuid='${childUuid}'} is unable to find ${parentSchema}{uuid='${parentUuid}'}`,
    );
  }
}
export default BaseEntity;
