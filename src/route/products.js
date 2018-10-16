import express from 'express';
const router = express.Router(); 
import product from "../controller/products";

router
    .get('/' , product.fetchProducts)
    .get('/:productId', product.fetchProduct)
    .post('/', product.createProduct)
    
export default router; 
