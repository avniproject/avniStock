import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import EntityService from './EntityService';
import Program from '../models/reference/Program';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import Realm from 'realm';
import EntityQueue from '../models/framework/EntityQueue';
import _ from 'lodash';
import ProductService from './ProductService';

@Service('stockService')
class StockService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    return ProgramEnrolment.schema.name;
  }

  getBatchDetails() {
    return _.map(this.getAllNonVoided(), enl => ({
      uuid: enl.uuid,
      batchNumber: enl.batchNumber,
    }));
  }

  getStocksByProductUUID(productUUID) {
    return this.getAllNonVoided()
      .filtered('individual.uuid = $0', productUUID)
      .sorted('enrolmentDateTime', true);
  }

  saveOrUpdate(stockState) {
    const db = this.db;
    ObservationsHolder.convertObsForSave(stockState.observations);
    db.write(() => {
      const stock = stockState.stock;
      const product = this.getService(ProductService).findByUUID(
        stock.individual.uuid,
      );
      stock.observations = stockState.observations;
      stock.program = this.getService(EntityService).findByName(
        Program.programName,
        Program.schema.name,
      );
      const savedEnrolment = db.create(
        this.getSchema(),
        stock,
        Realm.UpdateMode.Modified,
      );
      product.addEnrolment(savedEnrolment);
      db.create(
        EntityQueue.schema.name,
        EntityQueue.create(stock, this.getSchema()),
      );
    });
  }
}

export default StockService;
