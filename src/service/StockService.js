import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import ProgramEnrolment from '../models/transactional/ProgramEnrolment';
import EntityService from './EntityService';
import Program from '../models/reference/Program';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import Realm from 'realm';
import EntityQueue from '../models/framework/EntityQueue';

@Service('stockService')
class StockService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    return ProgramEnrolment.schema.name;
  }

  saveOrUpdate(stockState) {
    const db = this.db;
    ObservationsHolder.convertObsForSave(stockState.observations);
    db.write(() => {
      const stock = stockState.stock;
      stock.observations = stockState.observations;
      stock.program = this.getService(EntityService).findByName(
        Program.programName,
        Program.schema.name,
      );
      db.create(this.getSchema(), stock, Realm.UpdateMode.Modified);
      db.create(
        EntityQueue.schema.name,
        EntityQueue.create(stock, this.getSchema()),
      );
    });
  }
}

export default StockService;
