import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import {getService} from '../hooks/getService';
import StockService from '../service/StockService';

class StockState {
  constructor() {
    this.stock = ProgramEnrolment.createEmptyInstance();
    this.observationHolder = new ObservationsHolder(this.stock.observations);
  }

  static onLoad(newStockUUID) {
    if (newStockUUID) {
      const existingStock = getService(StockService).findByUUID(newStockUUID);
      const newState = new StockState();
      StockState.cloneStock(existingStock, newState.stock);
      newState.observationHolder = new ObservationsHolder(
        existingStock.observations,
      );
      return newState;
    }
    return new StockState();
  }

  static cloneStock(existingStock, newStock) {
    newStock.uuid = existingStock.uuid;
    newStock.program = existingStock.program;
    newStock.enrolmentDateTime = existingStock.enrolmentDateTime;
    newStock.programExitDateTime = existingStock.programExitDateTime;
    newStock.individual = existingStock.individual;
    newStock.voided = existingStock.voided;
  }

  clone() {
    const newState = new StockState();
    StockState.cloneStock(this.stock, newState.stock);
    newState.observationHolder = this.observationHolder;
    return newState;
  }

  get quantity() {
    return this.observationHolder.getObservationReadableValue(
      ProgramEnrolment.conceptNames.quantity,
    );
  }

  get batchNumber() {
    return this.observationHolder.getObservationReadableValue(
      ProgramEnrolment.conceptNames.batchNumber,
    );
  }

  get expiryDate() {
    return this.observationHolder.getObservationReadableValue(
      ProgramEnrolment.conceptNames.expiryDate,
    );
  }

  get observations() {
    return this.observationHolder.observations;
  }
}

export default StockState;
