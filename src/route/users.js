import express from 'express';
import users from '../controller/users';
//  import checkAuth from '../middlewares/checkAuth';

const router = express.Router();

router
  .post('/create', users.createUser)
  .post('/login', users.loginUser)
  .patch('/', users.updateUser)
  .delete('/', users.deleteUser);

export default router;
