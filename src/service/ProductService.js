import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import Individual from '../models/transactional/Individual';
import ObservationsHolder from '../models/observation/ObservationsHolder';
import EntityQueue from '../models/framework/EntityQueue';
import Realm from 'realm';
import _ from 'lodash';

@Service('productService')
class ProductService extends BaseService {
  constructor(db, beanStore) {
    super(db, beanStore);
  }

  getSchema() {
    return Individual.schema.name;
  }

  getSortedProductList(productName) {
    return this.getAllNonVoided()
      .filtered(
        _.isEmpty(productName)
          ? 'name <> null'
          : `name LIKE[c] "${productName}*"`,
      )
      .sorted('name');
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

  getRestockNeededProducts() {
    return this.getSortedProductList().filter(
      ind => ind.totalStock <= ind.restockLevel,
    );
  }
}

export default ProductService;
