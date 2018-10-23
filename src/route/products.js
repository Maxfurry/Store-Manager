import express from 'express';
import product from '../controller/products';
//  import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .get('/', product.fetchProducts)
  .get('/:productId', product.fetchProduct)
  .post('/', validate.validateGeneral, validate.validateProduct, product.createProduct)
  .patch('/', validate.validateGeneral, validate.validateProduct, product.updateProduct)
  .delete('/', validate.validateGeneral, validate.validateProduct, product.deleteProduct);

export default router;
