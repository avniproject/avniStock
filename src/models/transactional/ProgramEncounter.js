import _ from 'lodash';
import Realm from 'realm';
import General from '../../utility/General';
import EncounterType from '../reference/EncounterType';
import ProgramEnrolment from './ProgramEnrolment';
import ResourceUtil from '../utility/ResourceUtil';
import moment from 'moment';

class ProgramEncounter extends Realm.Object {
  static createEmptyInstance() {
    return {
      uuid: General.randomUUID(),
      name: '',
      encounterType: EncounterType.create(''),
      encounterDateTime: new Date(),
      programEnrolment: ProgramEnrolment.createEmptyInstance(),
      observations: [],
      voided: false,
    };
  }

  static fromResource(resource, entityService) {
    const programEncounter = General.assignFields(
      resource,
      ProgramEncounter.createEmptyInstance(),
      ['uuid', 'voided'],
      ['encounterDateTime'],
      ['observations'],
      entityService,
    );
    programEncounter.encounterType = entityService.findByKey(
      'uuid',
      ResourceUtil.getUUIDFor(resource, 'encounterTypeUUID'),
      EncounterType.schema.name,
    );
    programEncounter.name = resource.name;
    programEncounter.programEnrolment = entityService.findByKey(
      'uuid',
      ResourceUtil.getUUIDFor(resource, 'programEnrolmentUUID'),
      ProgramEnrolment.schema.name,
    );
    return programEncounter;
  }

  get toResource() {
    const resource = _.pick(this, ['uuid', 'voided']);
    resource.encounterTypeUUID = this.encounterType.uuid;
    resource.observations = _.map(this.observations, 'toResource');
    if (!_.isNil(this.encounterDateTime)) {
      resource.encounterDateTime = moment(this.encounterDateTime).format();
    }
    resource.name = this.name;
    resource.programEnrolmentUUID = this.programEnrolment.uuid;
    return resource;
  }
}

ProgramEncounter.schema = {
  name: 'ProgramEncounter',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: {type: 'string', optional: true},
    encounterType: 'EncounterType',
    encounterDateTime: {type: 'date', optional: true},
    programEnrolment: 'ProgramEnrolment',
    observations: {type: 'list', objectType: 'Observation'},
    voided: {type: 'bool', default: false},
  },
};

export default ProgramEncounter;
