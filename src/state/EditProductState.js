import ObservationsHolder from '../models/observation/ObservationsHolder';
import Individual from '../models/transactional/Individual';

class EditProductState {
  constructor() {
    this.product = Individual.createEmptyInstance();
    this.observationHolder = new ObservationsHolder(this.product.observations);
  }

  static onLoad(product) {
    const state = new EditProductState();
    state.product.uuid = product.uuid;
    state.product.name = product.name;
    state.observationHolder = new ObservationsHolder(product.observations);
    return state;
  }

  clone() {
    const newState = new EditProductState();
    newState.product = this.product;
    newState.observationHolder = this.observationHolder;
    return newState;
  }

  get restockLevel() {
    return this.observationHolder.getObservationReadableValue(
      Individual.conceptNames.restockLevel,
    );
  }

  get initialStock() {
    return this.observationHolder.getObservationReadableValue(
      Individual.conceptNames.initialStock,
    );
  }

  get totalStock() {
    return this.initialStock;
  }

  get observations() {
    return this.observationHolder.observations;
  }
}

export default EditProductState;
