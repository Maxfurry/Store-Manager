import express from 'express';
const router = express.Router(); 
import sales from "../controller/sales";

router
    .get('/' , sales.fetchSaleRecords)
    .get('/:id', sales.fetchSaleRecord)
    .post('/', sales.createSaleOrder)

export default router; 
