import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import {getService} from '../hooks/getService';
import StockService from '../service/StockService';
import CommonState from './CommonState';
import moment from 'moment';
import ValidationResult from '../models/framework/ValidationResult';
import _ from 'lodash';

class StockState extends CommonState {
  constructor() {
    const stock = ProgramEnrolment.createEmptyInstance();
    super(stock.observations);
    this.stock = stock;
  }

  static staticIds = {
    enrolmentDate: 'Enrolment_Date',
    product: 'Product',
  };

  static onLoad(newStockUUID) {
    if (newStockUUID) {
      const existingStock = getService(StockService).findByUUID(newStockUUID);
      const newState = new StockState();
      newState.editFlow = true;
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
    super.clone(newState);
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

  validateDate() {
    const id = StockState.staticIds.enrolmentDate;
    const date = this.stock.enrolmentDateTime;
    if (moment(date).isAfter(moment(), 'day')) {
      this.handleValidationResult(ValidationResult.failureForFutureDate(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateProduct() {
    const id = StockState.staticIds.product;
    if (_.isEmpty(this.stock.individual.subjectType.name)) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateQuantity() {
    const id = ProgramEnrolment.conceptNames.quantity;
    if (_.isEmpty(_.toString(this.quantity))) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateBatchNumber() {
    const id = ProgramEnrolment.conceptNames.batchNumber;
    if (_.isEmpty(this.batchNumber)) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else if (
      getService(StockService).isBatchNumberAlreadyUsedForProductExcept(
        this.batchNumber,
        this.stock.individual.uuid,
        this.stock.uuid,
      )
    ) {
      this.handleValidationResult(
        ValidationResult.failure(
          id,
          'Same batch number cannot be used twice for the same product.',
        ),
      );
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validateExpiryDate() {
    const id = ProgramEnrolment.conceptNames.expiryDate;
    if (_.isNil(this.expiryDate)) {
      this.handleValidationResult(ValidationResult.failureForEmpty(id));
    } else if (moment(this.expiryDate).isSameOrBefore(moment(), 'day')) {
      this.handleValidationResult(
        ValidationResult.failure(id, 'Adding expired products not allowed.'),
      );
    } else {
      this.handleValidationResult(ValidationResult.successful(id));
    }
  }

  validate() {
    this.validateDate();
    this.validateProduct();
    this.validateQuantity();
    this.validateBatchNumber();
    this.validateExpiryDate();
  }
}

export default StockState;
