import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import Individual from '../models/transactional/Individual';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import EntityQueue from '../models/framework/EntityQueue';
import Realm from 'realm';

@Service('productService')
class ProductService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    return Individual.schema.name;
  }

  getSortedProductList() {
    return this.getAllNonVoided().sorted('name');
  }

  updateProduct(editProductState) {
    const db = this.db;
    const savedProduct = this.findByUUID(editProductState.product.uuid);
    ObservationsHolder.convertObsForSave(editProductState.observations);
    db.write(() => {
      savedProduct.observations = editProductState.observations;
      db.create(this.getSchema(), savedProduct, Realm.UpdateMode.Modified);
      db.create(
        EntityQueue.schema.name,
        EntityQueue.create(savedProduct, this.getSchema()),
      );
    });
  }
}

export default ProductService;
