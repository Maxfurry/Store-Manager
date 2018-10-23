import express from 'express';
import product from '../controller/products';
import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validations';

const router = express.Router();

router
  .get('/', product.fetchProducts)
  .get('/:productId', product.fetchProduct)
  .post('/', validate.validateGeneral, validate.validateProduct, product.createProduct)
  .patch('/', checkAuth.checkToken, product.updateProduct)
  .delete('/', checkAuth.checkAdmin, product.deleteProduct);

export default router;
