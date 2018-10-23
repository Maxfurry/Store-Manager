import express from 'express';
import sales from '../controller/sales';
//  import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router
  .get('/', sales.fetchSaleRecords)
  .get('/:salesId', sales.fetchSaleRecord)
  .post('/', sales.createSaleOrder)
  .delete('/', sales.deleteSaleRecord);

export default router;
