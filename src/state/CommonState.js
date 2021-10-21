import ObservationsHolder from '../models/observation/ObservationsHolder';
import _ from 'lodash';
import ValidationResult from '../models/framework/ValidationResult';

class CommonState {
  constructor(observations) {
    this.observationHolder = new ObservationsHolder(observations);
    this.validationResults = [];
  }

  get observations() {
    return this.observationHolder.observations;
  }

  handleValidationResult(validationResult) {
    _.remove(
      this.validationResults,
      existingValidationResult =>
        existingValidationResult.formIdentifier ===
        validationResult.formIdentifier,
    );
    if (!validationResult.success) {
      this.validationResults.push(validationResult);
    }
  }

  get hasValidationError() {
    return this.validationResults.some(
      validationResult => !validationResult.success,
    );
  }

  clone(newState = new this.constructor()) {
    newState.validationResults = [];
    this.validationResults.forEach(validationResult => {
      newState.validationResults.push(ValidationResult.clone(validationResult));
    });
    newState.observationHolder = this.observationHolder;
    return newState;
  }

  findErrorByFormIdentifier(formIdentifier) {
    return _.find(
      this.validationResults,
      validationResult => validationResult.formIdentifier === formIdentifier,
    );
  }

  getErrorMessage(formIdentifier) {
    return _.get(this.findErrorByFormIdentifier(formIdentifier), 'messageKey');
  }
}

export default CommonState;
