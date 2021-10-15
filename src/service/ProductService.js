import BaseService from './BaseService';
import Service from '../framework/bean/Service';
import Individual from '../models/transactional/Individual';

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
}

export default ProductService;
