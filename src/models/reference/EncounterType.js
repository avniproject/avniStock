import _ from 'lodash';
import Realm from 'realm';

class EncounterType extends Realm.Object {
  static fromResource(operationalEncounterType) {
    return {
      name: operationalEncounterType.encounterTypeName,
      uuid: operationalEncounterType.encounterTypeUUID,
      voided: !!operationalEncounterType.encounterTypeVoided,
      operationalEncounterTypeName: operationalEncounterType.name,
      displayName: _.isEmpty(operationalEncounterType.name)
        ? operationalEncounterType.encounterTypeName
        : operationalEncounterType.name,
    };
  }

  clone() {
    const encounterType = this.toJSON();
    return _.clone(encounterType);
  }
}

EncounterType.schema = {
  name: 'EncounterType',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    operationalEncounterTypeName: {type: 'string', optional: true},
    displayName: 'string',
    voided: {type: 'bool', default: false},
  },
};

export default EncounterType;
