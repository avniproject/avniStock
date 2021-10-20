import ObservationsHolder from '../models/observation/ObservationsHolder';
import {getService} from '../hooks/getService';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import RemoveStockService from '../service/RemoveStockService';

class RemoveStockState {
  constructor() {
    this.stock = ProgramEncounter.createEmptyInstance();
    this.observationHolder = new ObservationsHolder(this.stock.observations);
  }

  static onLoad(existingUUID) {
    if (existingUUID) {
      const existingStock =
        getService(RemoveStockService).findByUUID(existingUUID);
      const newState = new RemoveStockState();
      RemoveStockState.cloneStock(existingStock, newState.stock);
      newState.observationHolder = new ObservationsHolder(
        existingStock.observations,
      );
      return newState;
    }
    return new RemoveStockState();
  }

  static cloneStock(existingStock, newStock) {
    newStock.uuid = existingStock.uuid;
    newStock.name = existingStock.name;
    newStock.encounterType = existingStock.encounterType;
    newStock.encounterDateTime = existingStock.encounterDateTime;
    newStock.programEnrolment = existingStock.programEnrolment;
    newStock.voided = existingStock.voided;
  }

  clone() {
    const newState = new RemoveStockState();
    RemoveStockState.cloneStock(this.stock, newState.stock);
    newState.observationHolder = this.observationHolder;
    return newState;
  }

  get quantity() {
    return this.observationHolder.getObservationReadableValue(
      ProgramEncounter.conceptNames.quantity,
    );
  }

  get observations() {
    return this.observationHolder.observations;
  }
}

export default RemoveStockState;
