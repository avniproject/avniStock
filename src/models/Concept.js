import Realm from 'realm';

class Concept extends Realm.Object {
  static fromResource(conceptResource) {
    return {
      name: conceptResource.name,
      uuid: conceptResource.uuid,
      datatype: conceptResource.dataType,
      lowAbsolute: conceptResource.lowAbsolute,
      hiAbsolute: conceptResource.highAbsolute,
      lowNormal: conceptResource.lowNormal,
      hiNormal: conceptResource.highNormal,
      unit: conceptResource.unit,
      voided: conceptResource.voided || false,
    };
  }
}

Concept.schema = {
  name: 'Concept',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    datatype: 'string',
    lowAbsolute: {type: 'double', optional: true},
    hiAbsolute: {type: 'double', optional: true},
    lowNormal: {type: 'double', optional: true},
    hiNormal: {type: 'double', optional: true},
    unit: {type: 'string', optional: true},
    voided: {type: 'bool', default: false},
  },
};

export default Concept;
