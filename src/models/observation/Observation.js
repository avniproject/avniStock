import _ from 'lodash';
import Realm from 'realm';
import {ConceptModel} from '../reference/Concept';

class Observation extends Realm.Object {
  static create(concept, value) {
    return {
      concept: concept,
      valueJSON: value,
    };
  }

  cloneForEdit() {
    return {
      concept: this.concept.cloneForReference(),
      valueJSON: this.getValueWrapper().cloneForEdit(),
    };
  }

  getValueWrapper() {
    if (_.isString(this.valueJSON)) {
      let valueParsed = JSON.parse(this.valueJSON);
      return this.concept.getValueWrapperFor(valueParsed.answer);
    }
    return this.valueJSON;
  }

  get toResource() {
    return {
      conceptUUID: this.concept.uuid,
      value: this.getValueWrapper().toResource,
    };
  }

  getValue() {
    return this.getValueWrapper().getValue();
  }

  setValue(valueWrapper) {
    this.valueJSON = valueWrapper;
  }

  getReadableValue() {
    let value = this.getValue();
    if (!_.isNil(value)) {
      if (this.concept.isCodedConcept()) {
        return this.concept.answers.find(
          conceptAnswer => conceptAnswer.concept.uuid === value,
        ).name;
      }
      return value;
    }
  }
}

Observation.schema = {
  name: 'Observation',
  properties: {
    concept: 'Concept',
    valueJSON: 'string',
  },
};

export class ObservationModel {
  constructor({concept, valueJSON}) {
    this.concept = new ConceptModel(concept);
    this.valueJSON = valueJSON;
  }

  static create(concept, value) {
    const conceptModel = new ConceptModel(concept);
    return new ObservationModel({concept: conceptModel, valueJSON: value});
  }

  getValueWrapper() {
    if (_.isString(this.valueJSON)) {
      let valueParsed = JSON.parse(this.valueJSON);
      return this.concept.getValueWrapperFor(valueParsed.answer);
    }
    return this.valueJSON;
  }
  getValue() {
    return this.getValueWrapper().getValue();
  }

  setValue(valueWrapper) {
    this.valueJSON = valueWrapper;
  }

  getReadableValue() {
    let value = this.getValue();
    if (!_.isNil(value)) {
      if (this.concept.isCodedConcept()) {
        return this.concept.answers.find(
          conceptAnswer => conceptAnswer.concept.uuid === value,
        ).name;
      }
      return value;
    }
  }
}

export default Observation;
