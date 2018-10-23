import express from 'express';
import product from '../controller/products';
//  import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router
  .get('/', product.fetchProducts)
  .get('/:productId', product.fetchProduct)
  .post('/', product.createProduct)
  .patch('/', product.updateProduct)
  .delete('/', product.deleteProduct);

export default router;
