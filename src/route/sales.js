import express from 'express';
import sales from '../controller/sales';
import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router
    .get('/', checkAuth.checkAdmin, sales.fetchSaleRecords)
    .get('/:salesId', checkAuth.checkToken, sales.fetchSaleRecord)
    .post('/', checkAuth.checkToken, sales.createSaleOrder)
    .delete('/', checkAuth.checkAdmin, sales.deleteSaleRecord);

export default router;
