import Concept, {ConceptAnswer} from '../reference/Concept';
import _ from 'lodash';
import AllSchema from '../Schema';
import Settings from '../reference/Settings';
import EncounterType from '../reference/EncounterType';
import Program from '../reference/Program';
import SubjectType from '../reference/SubjectType';
import Individual from '../transactional/Individual';
import UserInfo from '../reference/UserInfo';
import ProgramEnrolment from '../transactional/ProgramEnrolment';
import ProgramEncounter from '../transactional/ProgramEncounter';

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
  {res, resUrl, parent, apiVersion, syncWeight, privilegeParam} = {},
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
});

const concept = refData(Concept, {syncWeight: 10});
const conceptAnswer = refData(ConceptAnswer, {
  parent: concept,
  syncWeight: 10,
});
const subjectType = refData(SubjectType, {
  res: 'operationalSubjectType',
  syncWeight: 10,
});
const program = refData(Program, {res: 'operationalProgram', syncWeight: 10});
const encounterType = refData(EncounterType, {
  res: 'operationalEncounterType',
  syncWeight: 10,
});
const userInfo = txData(UserInfo, {
  resUrl: 'me',
  apiVersion: 'v2',
  syncWeight: 10,
});
const individual = txData(Individual, {
  syncWeight: 40,
  privilegeParam: 'subjectTypeUuid',
});
const programEnrolment = txData(ProgramEnrolment, {
  parent: individual,
  syncWeight: 5,
  privilegeParam: 'programUuid',
});
const programEncounter = txData(ProgramEncounter, {
  parent: programEnrolment,
  syncWeight: 9,
  privilegeParam: 'programEncounterTypeUuid',
});

class EntityMetaData {
  //order is important. last entity in each (tx and ref) with be executed first. parent should be synced before the child.
  static model() {
    return [
      encounterType,
      program,
      subjectType,
      conceptAnswer,
      concept,
      programEncounter,
      programEnrolment,
      individual,
      userInfo,
    ];
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
