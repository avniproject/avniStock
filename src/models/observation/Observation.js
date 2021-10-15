import _ from 'lodash';
import Realm from 'realm';

class Observation extends Realm.Object {
  static create(concept, value, abnormal = false) {
    return {
      concept: concept,
      valueJSON: value,
      abnormal: abnormal,
    };
  }

  static valueForDisplay(observation, conceptService) {
    const valueWrapper = observation.getValueWrapper();
    if (valueWrapper.isSingleCoded) {
      return conceptService.getConceptByUUID(valueWrapper.getConceptUUID())
        .name;
    }
    const unit = _.defaultTo(observation.concept.unit, '');
    return unit !== ''
      ? _.toString(`${valueWrapper.getValue()} ${unit}`)
      : _.toString(`${valueWrapper.getValue()}`);
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

export default Observation;
