import Realm from 'realm';
import PrimitiveValue from '../observation/PrimitiveValue';
import BaseEntity from '../framework/BaseEntity';
import General from '../../utility/General';
import SingleCodedValue from '../observation/SingleCodedValue';
import ResourceUtil from '../utility/ResourceUtil';

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

  static dataType = {
    Coded: 'Coded',
    Numeric: 'Numeric',
    Text: 'Text',
    NA: 'NA',
    Date: 'Date',
  };

  static associateChild(child, childEntityClass, childResource, entityService) {
    let concept = BaseEntity.getParentEntity(
      entityService,
      childEntityClass,
      childResource,
      'conceptUUID',
      Concept.schema.name,
    );
    concept = General.pick(concept, ['uuid'], ['answers']);
    let newAnswers = concept.answers;
    if (childEntityClass !== ConceptAnswer) {
      throw `${childEntityClass.name} not support by ${Concept.name}`;
    }

    BaseEntity.addNewChild(child, newAnswers);

    concept.answers = newAnswers;
    return concept;
  }

  static merge = () => BaseEntity.mergeOn('answers');

  isCodedConcept() {
    return this.datatype === Concept.dataType.Coded;
  }

  getValueWrapperFor(obsValue) {
    if (this.isCodedConcept()) {
      return new SingleCodedValue(obsValue);
    }
    return new PrimitiveValue(obsValue, this.datatype);
  }

  static create(name, dataType, uuid = General.randomUUID()) {
    return {
      name: name,
      datatype: dataType,
      uuid: uuid,
    };
  }

  cloneForReference() {
    const concept = Concept.create(this.name, this.datatype);
    concept.uuid = this.uuid;
    concept.unit = this.unit;
    concept.lowAbsolute = this.lowAbsolute;
    concept.lowNormal = this.lowNormal;
    concept.hiNormal = this.hiNormal;
    concept.hiAbsolute = this.hiAbsolute;
    concept.answers = this.answers || [];
    return concept;
  }
}

Concept.schema = {
  name: 'Concept',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    name: 'string',
    datatype: 'string',
    answers: {type: 'list', objectType: 'ConceptAnswer'},
    lowAbsolute: {type: 'double', optional: true},
    hiAbsolute: {type: 'double', optional: true},
    lowNormal: {type: 'double', optional: true},
    hiNormal: {type: 'double', optional: true},
    unit: {type: 'string', optional: true},
    voided: {type: 'bool', default: false},
  },
};

export class ConceptAnswer extends Realm.Object {
  get name() {
    return this.concept.name;
  }

  static fromResource(resource, entityService) {
    return {
      concept: entityService.findByKey(
        'uuid',
        ResourceUtil.getUUIDFor(resource, 'conceptAnswerUUID'),
        Concept.schema.name,
      ),
      uuid: resource.uuid,
      answerOrder: resource.order,
      abnormal: resource.abnormal,
      unique: resource.unique,
      voided: resource.voided || false,
    };
  }

  static parentAssociations = () => new Map([[Concept, 'conceptUUID']]);
}

ConceptAnswer.schema = {
  name: 'ConceptAnswer',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    concept: 'Concept',
    answerOrder: 'double',
    abnormal: 'bool',
    unique: 'bool',
    voided: {type: 'bool', default: false},
  },
};

export class ConceptModel {
  constructor(concept) {
    this.uuid = concept.uuid;
    this.name = concept.name;
    this.datatype = concept.datatype;
    this.answers = concept.answers;
    this.lowAbsolute = concept.lowAbsolute;
    this.hiAbsolute = concept.hiAbsolute;
    this.lowNormal = concept.lowNormal;
    this.hiNormal = concept.hiNormal;
    this.unit = concept.unit;
    this.voided = concept.voided;
  }

  isCodedConcept() {
    return this.datatype === Concept.dataType.Coded;
  }

  getValueWrapperFor(obsValue) {
    if (this.isCodedConcept()) {
      return new SingleCodedValue(obsValue);
    }
    return new PrimitiveValue(obsValue, this.datatype);
  }
}

export default Concept;
