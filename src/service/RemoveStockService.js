import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import EntityService from './EntityService';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import Realm from 'realm';
import EntityQueue from '../models/framework/EntityQueue';
import ProgramEncounter from '../models/transactional/ProgramEncounter';
import EncounterType from '../models/reference/EncounterType';
import StockService from './StockService';

@Service('removeStockService')
class RemoveStockService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    return ProgramEncounter.schema.name;
  }

  getRemovedListForProductUUID(productUUID) {
    return this.getAllNonVoided().filtered(
      'programEnrolment.individual.uuid = $0',
      productUUID,
    );
  }

  saveOrUpdate(removeStockState) {
    const db = this.db;
    ObservationsHolder.convertObsForSave(removeStockState.observations);
    db.write(() => {
      const stock = removeStockState.stock;
      const productBatch = this.getService(StockService).findByUUID(
        stock.programEnrolment.uuid,
      );
      stock.observations = removeStockState.observations;
      stock.encounterType = this.getService(EntityService).findByName(
        EncounterType.encounterTypeName,
        EncounterType.schema.name,
      );
      const savedEnc = db.create(
        this.getSchema(),
        stock,
        Realm.UpdateMode.Modified,
      );
      productBatch.addEncounter(savedEnc);
      db.create(
        EntityQueue.schema.name,
        EntityQueue.create(stock, this.getSchema()),
      );
    });
  }
}

export default RemoveStockService;
