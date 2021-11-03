import ObservationsHolder from '../models/observation/ObservationsHolder';
import {getService} from '../hooks/getService';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import RemoveStockService from '../service/RemoveStockService';
import CommonState from './CommonState';
import moment from 'moment';
import ValidationResult from '../models/framework/ValidationResult';
import _ from 'lodash';
import StockService from '../service/StockService';
import {formatString} from '../service/i18n/messages';

class RemoveStockState extends CommonState {
  constructor() {
    const stock = ProgramEncounter.createEmptyInstance();
    super(stock.observations);
    this.stock = stock;
  }

  static staticIds = {
    encounterDate: 'Encounter_Date',
    batchNumber: 'Batch_number',
    product: 'Product',
  };

  static onLoad(existingUUID) {
    if (existingUUID) {
      const existingStock =
        getService(RemoveStockService).findByUUID(existingUUID);
      const newState = new RemoveStockState();
      newState.editFlow = true;
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
    super.clone(newState);
    return newState;
  }

  get quantity() {
    return this.observationHolder.getObservationReadableValue(
      ProgramEncounter.conceptNames.quantity,
    );
  }

  validateDate() {
    const id = RemoveStockState.staticIds.encounterDate;
    const date = this.stock.encounterDateTime;
    if (_.isNil(date)) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else if (moment(date).isAfter(moment(), 'day')) {
      this.handleValidationResult(ValidationResult.failureForFutureDate(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateBatchNumber() {
    const id = RemoveStockState.staticIds.batchNumber;
    if (_.isEmpty(this.stock.programEnrolment.program.name)) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateProduct() {
    const id = RemoveStockState.staticIds.product;
    if (_.isEmpty(this.stock.programEnrolment.individual.subjectType.name)) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateQuantity() {
    const id = ProgramEncounter.conceptNames.quantity;
    const totalRemainingInBatch = getService(
      StockService,
    ).getTotalRemainingInBatchExcept(
      this.stock.programEnrolment.uuid,
      this.stock.uuid,
    );
    if (_.isEmpty(_.toString(this.quantity))) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else if (this.quantity > totalRemainingInBatch) {
      this.handleValidationResult(
        ValidationResult.failure(
          id,
          formatString('moreQuantityError', {totalRemainingInBatch}),
        ),
      );
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validate() {
    this.validateDate();
    this.validateBatchNumber();
    this.validateProduct();
    this.validateQuantity();
  }
}

export default RemoveStockState;
