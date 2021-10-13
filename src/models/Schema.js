import Settings from './Settings';
import UserInfo from './UserInfo';
import EntitySyncStatus from './EntitySyncStatus';
import Concept from './Concept';
import EntityQueue from './EntityQueue';

export default {
  schema: [Settings, UserInfo, EntitySyncStatus, Concept, EntityQueue],
  schemaVersion: 1,
  deleteRealmIfMigrationNeeded: true,
};
