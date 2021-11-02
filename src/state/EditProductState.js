import ObservationsHolder from '../models/observation/ObservationsHolder';
import Individual from '../models/transactional/Individual';
import _ from 'lodash';
import CommonState from './CommonState';
import ValidationResult from '../models/framework/ValidationResult';

class EditProductState extends CommonState {
  constructor() {
    const product = Individual.createEmptyInstance();
    super(product.observations);
    this.product = product;
  }

  static onLoad(product) {
    const state = new EditProductState();
    state.editFlow = true;
    state.product.uuid = product.uuid;
    state.product.name = product.name;
    state.product.totalAdded = product.getTotalAdded();
    state.product.toalRemoved = product.getTotalRemoved();
    state.observationHolder = new ObservationsHolder(product.observations);
    return state;
  }

  clone() {
    const newState = new EditProductState();
    newState.product = _.clone(this.product);
    super.clone(newState);
    return newState;
  }

  get restockLevel() {
    return this.observationHolder.getObservationReadableValue(
      Individual.conceptNames.restockLevel,
    );
  }

  get totalStock() {
    return this.product.totalAdded - this.product.toalRemoved;
  }

  validateRestockLevel() {
    const id = Individual.conceptNames.restockLevel;
    if (_.isEmpty(_.toString(this.restockLevel))) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validate() {
    this.validateRestockLevel();
  }
}

export default EditProductState;
