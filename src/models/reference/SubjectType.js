import Realm from 'realm';
import _ from 'lodash';
import General from '../../utility/General';

class SubjectType extends Realm.Object {
  static types = {
    Person: 'Person',
    Individual: 'Individual',
    Group: 'Group',
    Household: 'Household',
  };

  static create(name, type) {
    return {
      uuid: General.randomUUID(),
      name: name,
      type: type,
      voided: false,
    };
  }

  static fromResource(operationalSubjectType) {
    return {
      name: operationalSubjectType.name,
      uuid: operationalSubjectType.subjectTypeUUID,
      voided: !!operationalSubjectType.voided,
      type: operationalSubjectType.type,
    };
  }

  clone() {
    const subjectType = this.toJSON();
    return _.clone(subjectType);
  }
}

SubjectType.schema = {
  name: 'SubjectType',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    voided: {type: 'bool', default: false},
    type: 'string',
  },
};

export default SubjectType;
