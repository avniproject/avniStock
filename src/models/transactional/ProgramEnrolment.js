import Realm from 'realm';
import General from '../../utility/General';
import _ from 'lodash';
import ResourceUtil from '../utility/ResourceUtil';
import Program from '../reference/Program';
import Individual from './Individual';
import ProgramEncounter from './ProgramEncounter';
import BaseEntity from '../framework/BaseEntity';
import moment from 'moment';

class ProgramEnrolment extends Realm.Object {
  static conceptNames = {
    quantity: 'Quantity',
    batchNumber: 'Batch number',
    expiryDate: 'Expiry date',
  };

  static createEmptyInstance() {
    return {
      uuid: General.randomUUID(),
      program: Program.create(''),
      enrolmentDateTime: new Date(),
      observations: [],
      programExitObservations: [],
      programExitDateTime: null,
      individual: Individual.createEmptyInstance(),
      voided: false,
    };
  }

  get toResource() {
    const resource = _.pick(this, ['uuid', 'voided']);
    resource.programUUID = this.program.uuid;
    resource.enrolmentDateTime = moment(this.enrolmentDateTime).format();
    if (!_.isNil(this.programExitDateTime)) {
      resource.programExitDateTime = moment(this.programExitDateTime).format();
    }
    resource.individualUUID = this.individual.uuid;
    resource.observations = [];
    this.observations.forEach(obs => {
      resource.observations.push(obs.toResource);
    });
    resource.programExitObservations = [];
    this.programExitObservations.forEach(obs => {
      resource.programExitObservations.push(obs.toResource);
    });
    return resource;
  }

  static fromResource(resource, entityService) {
    const program = entityService.findByKey(
      'uuid',
      ResourceUtil.getUUIDFor(resource, 'programUUID'),
      Program.schema.name,
    );
    const individual = entityService.findByKey(
      'uuid',
      ResourceUtil.getUUIDFor(resource, 'individualUUID'),
      Individual.schema.name,
    );

    const programEnrolment = General.assignFields(
      resource,
      ProgramEnrolment.createEmptyInstance(),
      ['uuid', 'voided'],
      ['enrolmentDateTime', 'programExitDateTime'],
      ['observations', 'programExitObservations'],
      entityService,
    );
    programEnrolment.program = program;
    programEnrolment.individual = individual;
    return programEnrolment;
  }

  static merge = childEntityClass =>
    BaseEntity.mergeOn(
      new Map([[ProgramEncounter, 'encounters']]).get(childEntityClass),
    );

  static associateChild(child, childEntityClass, childResource, entityService) {
    let programEnrolment = BaseEntity.getParentEntity(
      entityService,
      childEntityClass,
      childResource,
      'programEnrolmentUUID',
      ProgramEnrolment.schema.name,
    );
    programEnrolment = General.pick(programEnrolment, ['uuid'], ['encounters']);
    if (childEntityClass === ProgramEncounter) {
      BaseEntity.addNewChild(child, programEnrolment.encounters);
    } else {
      throw `${childEntityClass.name} not support by ${ProgramEnrolment.name}`;
    }
    return programEnrolment;
  }
}

ProgramEnrolment.schema = {
  name: 'ProgramEnrolment',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    program: 'Program',
    enrolmentDateTime: 'date',
    observations: {type: 'list', objectType: 'Observation'},
    programExitObservations: {type: 'list', objectType: 'Observation'},
    programExitDateTime: {type: 'date', optional: true},
    individual: 'Individual',
    voided: {type: 'bool', default: false},
    encounters: {type: 'list', objectType: 'ProgramEncounter'},
  },
};

export default ProgramEnrolment;
