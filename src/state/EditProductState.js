import ObservationsHolder from '../models/observation/ObservationsHolder';
import Individual from '../models/transactional/Individual';

class EditProductState {
  constructor(uuid, name, observations = []) {
    this.uuid = uuid;
    this.name = name;
    this.observationHolder = new ObservationsHolder(observations);
  }

  static onLoad(product) {
    const state = new EditProductState();
    state.uuid = product.uuid;
    state.name = product.name;
    state.observationHolder = new ObservationsHolder(product.observations);
    return state;
  }

  clone() {
    const newState = new EditProductState();
    newState.uuid = this.uuid;
    newState.name = this.name;
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
