import _ from 'lodash';
import Realm from 'realm';
import General from '../../utility/General';

class UserInfo extends Realm.Object {
  static UUID = 'ce9ad8ee-193e-49ee-8626-49802c8b4bd7';
  static DEFAULT_SETTINGS = '{"trackLocation": false, "locale": "en"}';

  static fromResource(resource) {
    return {
      username: resource.username,
      uuid: UserInfo.UUID,
      organisationName: resource.organisationName,
      settings: _.isNil(resource.settings)
        ? UserInfo.DEFAULT_SETTINGS
        : JSON.stringify(resource.settings),
      name: resource.name,
      catchmentName: resource.catchmentName,
    };
  }

  setSettings(settingsObject) {
    this.settings = JSON.stringify(settingsObject);
  }

  getSettings() {
    return JSON.parse(this.settings);
  }

  getDisplayUsername() {
    return _.isNil(this.name) ? this.username : this.name;
  }

  get toResource() {
    const resource = _.pick(this, ['uuid']);
    resource.settings = this.getSettings();
    return resource;
  }

  clone() {
    const userInfo = this.toJSON();
    return _.clone(userInfo);
  }

  static createEmptyInstance() {
    const userInfo = {
      username: '',
      uuid: General.randomUUID(),
      organisationName: '',
      catchmentName: '',
    };
    userInfo.settings = UserInfo.DEFAULT_SETTINGS;
    return userInfo;
  }
}

UserInfo.schema = {
  name: 'UserInfo',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    username: 'string',
    organisationName: 'string',
    settings: 'string',
    name: {type: 'string', optional: true},
    catchmentName: {type: 'string', optional: true},
  },
};
export default UserInfo;
