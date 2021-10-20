import moment from 'moment';
import Realm from 'realm';
import SubjectType from '../reference/SubjectType';
import General from '../../utility/General';
import _ from 'lodash';
import ResourceUtil from '../utility/ResourceUtil';
import BaseEntity from '../framework/BaseEntity';
import ProgramEnrolment from './ProgramEnrolment';

class Individual extends Realm.Object {
  static conceptNames = {
    unit: 'Unit',
    restockLevel: 'Restock level',
    initialStock: 'Initial stock',
  };

  static createEmptyInstance() {
    return {
      uuid: General.randomUUID(),
      subjectType: SubjectType.create(''),
      name: '',
      addressLevelUUID: '',
      registrationDate: new Date(),
      observations: [],
    };
  }

  get toResource() {
    const resource = _.pick(this, ['uuid', 'voided', 'addressLevelUUID']);
    resource.firstName = this.name;
    resource.registrationDate = moment(this.registrationDate).format(
      'YYYY-MM-DD',
    );
    resource.subjectTypeUUID = this.subjectType.uuid;
    resource.observations = [];
    this.observations.forEach(obs => {
      resource.observations.push(obs.toResource);
    });
    return resource;
  }

  static fromResource(individualResource, entityService) {
    const subjectType = entityService.findByKey(
      'uuid',
      ResourceUtil.getUUIDFor(individualResource, 'subjectTypeUUID'),
      SubjectType.schema.name,
    );
    const individual = General.assignFields(
      individualResource,
      Individual.createEmptyInstance(),
      ['uuid', 'voided'],
      ['registrationDate'],
      ['observations'],
      entityService,
    );
    individual.addressLevelUUID = ResourceUtil.getUUIDFor(
      individualResource,
      'addressUUID',
    );
    individual.subjectType = subjectType;
    individual.name = individualResource.firstName;
    return individual;
  }

  static merge = childEntityClass =>
    BaseEntity.mergeOn(
      new Map([[ProgramEnrolment, 'enrolments']]).get(childEntityClass),
    );

  static associateChild(child, childEntityClass, childResource, entityService) {
    var individual = BaseEntity.getParentEntity(
      entityService,
      childEntityClass,
      childResource,
      'individualUUID',
      Individual.schema.name,
    );
    individual = General.pick(individual, ['uuid'], ['enrolments']);
    if (childEntityClass === ProgramEnrolment) {
      BaseEntity.addNewChild(child, individual.enrolments);
    } else {
      throw `${childEntityClass.name} not support by ${individual.nameString}`;
    }
    return individual;
  }

  clone() {
    const individual = this.toJSON();
    return _.cloneDeep(individual);
  }

  findObservation(conceptName) {
    return _.find(this.observations, observation => {
      return observation.concept.name === conceptName;
    });
  }

  getObservationReadableValue(conceptName) {
    const observationForConcept = this.findObservation(conceptName);
    return _.isNil(observationForConcept)
      ? observationForConcept
      : observationForConcept.getReadableValue();
  }

  get restockLevel() {
    return this.getObservationReadableValue(
      Individual.conceptNames.restockLevel,
    );
  }

  get initialStock() {
    return this.getObservationReadableValue(
      Individual.conceptNames.initialStock,
    );
  }

  get totalStock() {
    return this.initialStock;
  }

  get unit() {
    return this.getObservationReadableValue(Individual.conceptNames.unit);
  }

  addEnrolment(programEnrolment) {
    if (!_.some(this.enrolments, x => x.uuid === programEnrolment.uuid)) {
      this.enrolments.push(programEnrolment);
    }
  }
}

Individual.schema = {
  name: 'Individual',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    subjectType: 'SubjectType',
    name: 'string',
    registrationDate: 'date',
    voided: {type: 'bool', default: false},
    observations: {type: 'list', objectType: 'Observation'},
    addressLevelUUID: 'string',
    enrolments: {type: 'list', objectType: 'ProgramEnrolment'},
  },
};
export default Individual;
