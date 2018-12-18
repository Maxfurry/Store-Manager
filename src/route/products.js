import express from 'express';
import product from '../controller/products';
import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .get('/', checkAuth.checkToken, product.fetchProducts)
  .get('/:productId', checkAuth.checkToken, product.fetchProduct)
  .post('/', checkAuth.checkAdmin, validate.validateGeneral, validate.validateProduct, product.productExist, product.createProduct)
  .put('/:productId', checkAuth.checkAdmin, validate.validateGeneral, validate.validateProduct, product.updateProduct)
  .delete('/:productId', checkAuth.checkAdmin, product.deleteProduct);

export default router;
