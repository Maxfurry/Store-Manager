import express from 'express';
import product from '../controller/products';
import checkAuth from '../middlewares/checkAuth'
const router = express.Router(); 

router
    .get('/' , checkAuth.checkToken, product.fetchProducts)
    .get('/:productId', checkAuth.checkToken, product.fetchProduct)
    .post('/', checkAuth.checkAdmin, product.createProduct)
    .patch('/', checkAuth.checkToken, product.updateProduct)
    .delete('/', checkAuth.checkAdmin, product.deleteProduct)

export default router; 
