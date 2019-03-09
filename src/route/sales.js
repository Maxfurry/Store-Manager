import express from 'express';
import sales from '../controller/sales';
import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .get('/', checkAuth.checkToken, sales.fetchSaleRecords)
  .get('/:salesId', checkAuth.checkToken, sales.fetchSaleRecord)
  // .get('/userId', checkAuth.checkToken, sales.fetchSaleRecord)
  .post('/', checkAuth.checkToken, validate.validateGeneral, validate.validateSale, sales.createSaleOrder)
  .delete('/:salesId', checkAuth.checkAdmin, validate.validateGeneral, validate.validateSale, sales.deleteSaleRecord);

export default router;
