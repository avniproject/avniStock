import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import UserInfo from '../models/reference/UserInfo';

@Service('userInfoService')
class UserInfoService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getUserInfo() {
    const userInfo = this.db.objects(UserInfo.schema.name);
    if (userInfo === undefined || userInfo.length === 0) {
      return UserInfo.createEmptyInstance();
    }
    return userInfo[0];
  }

  getUserSettings() {
    return this.getUserInfo().getSettings();
  }

  saveOrUpdate(entity) {
    return super.saveOrUpdate(entity, UserInfo.schema.name);
  }
}

export default UserInfoService;
