import Concept from './Concept';
import _ from 'lodash';
import AllSchema from './Schema';
import Settings from './Settings';

const refData = (
  clazz,
  {res, filter = 'lastModified', translated, parent, syncWeight, resUrl} = {},
) => ({
  entityName: clazz.schema.name,
  entityClass: clazz,
  resourceName: res || _.camelCase(clazz.schema.name),
  type: 'reference',
  resourceSearchFilterURL: filter,
  parent: parent,
  syncWeight: syncWeight,
  resourceUrl: resUrl,
});

const txData = (
  clazz,
  {
    res,
    resUrl,
    parent,
    apiVersion,
    syncWeight,
    privilegeParam,
    privilegeEntity,
    privilegeName,
    queryParam,
    hasMoreThanOneAssociation,
  } = {},
) => ({
  entityName: clazz.schema.name,
  entityClass: clazz,
  resourceName: res || _.camelCase(clazz.schema.name),
  resourceUrl: resUrl,
  type: 'tx',
  parent: parent,
  apiVersion,
  syncWeight: syncWeight,
  privilegeParam,
  privilegeEntity,
  privilegeName,
  queryParam,
  hasMoreThanOneAssociation: !!hasMoreThanOneAssociation,
});

const concept = refData(Concept, {syncWeight: 4});

class EntityMetaData {
  //order is important. last entity in each (tx and ref) with be executed first. parent should be synced before the child.
  static model() {
    return [concept];
  }

  static entitiesLoadedFromServer() {
    return _.differenceBy(AllSchema.schema, [Settings], 'schema.name');
  }

  static findByName(entityName) {
    return _.find(
      EntityMetaData.model(),
      entityMetadata => entityMetadata.entityName === entityName,
    );
  }
}

export default EntityMetaData;
