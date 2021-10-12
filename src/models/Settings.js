import Realm from 'realm';
import _ from 'lodash';
import InitialSettings from '../../config/initialSettings';
import Config from '../framework/Config';

class Settings extends Realm.Object {
  static UUID = '2aa81079-38c3-4d9f-8380-f50544b32b3d';

  clone() {
    const settings = this.toJSON();
    return _.clone(settings);
  }

  static create() {
    return {
      uuid: Settings.UUID,
      password: '',
      logLevel: InitialSettings.logLevel,
      pageSize: InitialSettings.pageSize,
      serverURL: Config.SERVER_URL,
      poolId: '',
      clientId: Config.CLIENT_ID || '',
    };
  }
}

Settings.schema = {
  name: 'Settings',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    serverURL: 'string',
    logLevel: 'int',
    pageSize: 'int',
    poolId: 'string',
    clientId: 'string',
    userId: {type: 'string', optional: true},
  },
};

export default Settings;
