import Settings from './reference/Settings';
import UserInfo from './reference/UserInfo';
import EntitySyncStatus from './framework/EntitySyncStatus';
import Concept, {ConceptAnswer} from './reference/Concept';
import EntityQueue from './framework/EntityQueue';
import EncounterType from './reference/EncounterType';
import Program from './reference/Program';
import SubjectType from './reference/SubjectType';
import Observation from './observation/Observation';
import Individual from './transactional/Individual';

export default {
  schema: [
    Settings,
    UserInfo,
    EntitySyncStatus,
    ConceptAnswer,
    Concept,
    EntityQueue,
    EncounterType,
    Program,
    SubjectType,
    Observation,
    Individual,
  ],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true,
};
