import express from 'express'; 
import users from "../controller/users";
import checkAuth from '../middlewares/checkAuth';
const router = express.Router();

router
    .post('/create',checkAuth.checkAdmin, users.createUser)
    .post('/login',users.loginUser)
    .patch('/', checkAuth.checkToken, users.updateUser)
    .delete('/', checkAuth.checkAdmin, users.deleteUser)

export default router; 
