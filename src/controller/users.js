import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import func from '../middlewares/functions';

class Users {
    // Module that create new user
    static createUser(req, res) {
        const user = {
            name: req.body.name,
            role: req.body.role,
            position: req.body.position,
            password: req.body.password,
        };

        user.password = bcrypt.hashSync(req.body.password, 10);

        const updatedFile = func.updateFile('users', user, req.body.name);

        if (updatedFile === 'error') {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Your request was not succesfull',
            });
        }

        return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: {
                name: req.body.name,
                role: req.body.role,
                position: req.body.position,
                password: req.body.password,
            },
            message: 'User Created Successfully',
        });
    }

    // Module that logs in users
    static loginUser(req, res) {
        const getUser = func.readFile('users', req.params.name);
        const password = getUser[req.body.name].password;

        const checkPassword = bcrypt.compareSync(req.body.password, password);
        if (checkPassword) {
            const token = jwt.sign({
                name: req.body.name,
                role: req.body.role,
            }, 'lagretame', {
                expiresIn: '1h',
            });

            return res.status(200).json({
                TYPE: 'POST',
                token,
                message: 'Login Successful',
            });
        }
        return res.status(403).json({
            TYPE: 'POST',
            status: 403,
            message: 'Invalid Credentials',
        });
    }

    //  Updates Users Information
    static updateUser(req, res) {
        const user = {
            name: req.body.name,
            role: req.body.role,
            position: req.body.position,
            password: req.body.password,
        };

        user.password = bcrypt.hashSync(req.body.password, 10);

        const updatedFile = func.updateFile('users', user, req.body.name, 'update');

        if (updatedFile === 'error') {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Your request was not succesfull',
            });
        }

        return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: {
                name: req.body.name,
                role: req.body.role,
                position: req.body.position,
                password: req.body.password,
            },
            message: 'User updated Successfully',
        });
    }

    //  Module that delete user
    static deleteUser(req, res) {
        const deletedFile = func.deleteFile('users', req.body.name);

        if (deletedFile === 'error') {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Your request was not succesfull',
            });
        }

        return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: deletedFile,
            message: 'User Deleted Successfully',
        });
    }
}

export default Users;
