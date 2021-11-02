import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import UserInfo from '../models/reference/UserInfo';
import EntityService from './EntityService';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import EntityQueue from '../models/framework/EntityQueue';
import Realm from 'realm';

@Service('userInfoService')
class UserInfoService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    return UserInfo.schema.name;
  }

  getUserInfo() {
    const userInfo = this.getAll();
    if (userInfo === undefined || userInfo.length === 0) {
      return UserInfo.createEmptyInstance();
    }
    return userInfo[0];
  }

  getUserSettings() {
    const userInfo = this.getUserInfo();
    return JSON.parse(userInfo.settings);
  }

  updateLocale(locale) {
    const db = this.db;
    db.write(() => {
      const userInfo = this.getUserInfo();
      const settings = JSON.parse(userInfo.settings);
      settings.locale = locale;
      userInfo.settings = JSON.stringify(settings);
      db.create(this.getSchema(), userInfo, Realm.UpdateMode.Modified);
      db.create(
        EntityQueue.schema.name,
        EntityQueue.create(userInfo, this.getSchema()),
      );
    });
  }
}

export default UserInfoService;
