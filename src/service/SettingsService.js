import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import InitialSettings from '../../config/initialSettings.json';
import General from '../utility/General';
import Settings from '../models/reference/Settings';
import Config from '../framework/Config';
import _ from 'lodash';
import Realm from 'realm';

@Service('settingsService')
class SettingsService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  init() {
    const dbInScope = this.db;
    this.db.write(() => {
      console.log('SettingsService', 'Config.ENV', Config.ENV);
      let settings = this.getSettings();
      if (_.isNil(settings) || Config.ENV === 'dev') {
        settings = Settings.create();
        dbInScope.create(
          Settings.schema.name,
          settings,
          Realm.UpdateMode.Modified,
        );
      }

      if (this.isDev()) {
        settings.logLevel = General.LogLevel.Debug;
        settings.pageSize = InitialSettings.dev.pageSize;
      }
    });
    let level = this.getSettings().logLevel;
    if (Config.ENV === 'ext-dev') {
      level = InitialSettings.logLevel;
    }
    console.log('SettingsService', 'Log level', level);
    General.setCurrentLogLevel(level);
    General.logDebug('SettingsService', 'General - Test log debug message');
  }

  getSettings() {
    const settings = this.db.objects(Settings.schema.name);
    if (settings === undefined || settings.length === 0) {
      return undefined;
    }
    return settings[0];
  }

  saveOrUpdate(entity) {
    const output = super.saveOrUpdate(entity, Settings.schema.name);
    let level = this.getSettings().logLevel;
    General.setCurrentLogLevel(level);
    return output;
  }

  isDev() {
    return Config.ENV === 'dev';
  }
}

export default SettingsService;
