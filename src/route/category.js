import express from 'express';
import cat from '../controller/category';
import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router
  .get('/', checkAuth.checkToken, cat.fetchCategories)
  .post('/', checkAuth.checkAdmin, cat.createCategory)
  .delete('/:catId', checkAuth.checkAdmin, cat.deleteCategory);

export default router;
