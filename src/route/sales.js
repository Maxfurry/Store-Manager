import express from 'express';
import sales from '../controller/sales';
import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validations';

const router = express.Router();

router
  .get('/', sales.fetchSaleRecords)
  .get('/:salesId', sales.fetchSaleRecord)
  .post('/', validate.validateGeneral, validate.validateSale, sales.createSaleOrder)
  .delete('/', checkAuth.checkAdmin, sales.deleteSaleRecord);

export default router;
