import _ from 'lodash';
import Observation, {ObservationModel} from './Observation';
import PrimitiveValue from './PrimitiveValue';

class ObservationsHolder {
  constructor(observations) {
    this.observations = _.map(
      observations,
      o => new ObservationModel(o.cloneForEdit()),
    );
  }

  findObservation(conceptName) {
    return _.find(this.observations, observation => {
      return observation.concept.name === conceptName;
    });
  }

  getObservation(conceptName) {
    return this.findObservation(conceptName);
  }

  findObservationByValue(value) {
    return _.find(
      this.observations,
      observation => observation.getValue() === value,
    );
  }

  addOrUpdatePrimitiveObs(concept, value) {
    this._removeExistingObs(concept.name);
    if (!_.isEmpty(_.toString(value))) {
      this.observations.push(
        ObservationModel.create(
          concept,
          new PrimitiveValue(value, concept.datatype),
        ),
      );
    }
  }

  _removeExistingObs(conceptName) {
    const observation = this.getObservation(conceptName);
    if (!_.isEmpty(observation)) {
      _.remove(
        this.observations,
        obs => obs.concept.uuid === observation.concept.uuid,
      );
    }
  }

  static convertObsForSave(observations) {
    observations.forEach(observation => {
      observation.valueJSON = JSON.stringify(observation.valueJSON);
    });
  }

  getObservationReadableValue(conceptName) {
    let obs = this.getObservation(conceptName);
    return obs ? obs.getReadableValue() : null;
  }
}

export default ObservationsHolder;
