import express from 'express';
import users from '../controller/users';
import checkAuth from '../middlewares/checkAuth';
import validate from '../middlewares/validate';

const router = express.Router();

router
  .post('/signup', validate.validateLogin, validate.validateUser, checkAuth.checkAdmin, users.createUser)
  .post('/login', validate.validateLogin, users.loginUser);
// .patch('/', checkAuth.checkToken, users.updateUser)
// .delete('/', checkAuth.checkAdmin, users.deleteUser);

export default router;
