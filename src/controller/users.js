import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../model/dbconfig';

class Users {
  // Module that create new user
  static createUser(req, res, next) {
    const password = bcrypt.hashSync(req.body.password, 10);

    const user = [
      req.body.name,
      password,
      req.body.role,
      req.body.position,
    ];

    db.query('INSERT INTO users(name, password, roles, position) VALUES($1,$2,$3,$4)', user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({
        success: true,
        info: {
          name: req.body.name,
          role: req.body.role,
          position: req.body.position,
          password: req.body.password,
        },
        message: 'User Created Successfully',
      });
    });
  }

  // Module that logs in users
  static loginUser(req, res, next) {
    db.query('SELECT * from users WHERE name=$1', [req.body.name], (err, data) => {
      if (err) {
        return next(err);
      }
      if (data.rowCount > 0) {
        const checkPassword = bcrypt.compareSync(req.body.password, data.rows[0].password);
        const role = data.rows[0].roles;
        if (checkPassword) {
          const token = jwt.sign({
            name: req.body.name,
            role,
          }, process.env.JWTKEY, {
            expiresIn: '1h',
          });

          return res.status(200).json({
            success: true,
            token,
            message: 'Login Successful',
          });
        }
        return res.status(403).json({
          success: false,
          message: 'Invalid Credentials',
        });
      }
      return res.status(403).json({
        success: false,
        message: 'Invalid Credentials',
      });
    });
  }

//   //  Updates Users Information
//   static updateUser(req, res) {
//     const user = {
//       name: req.body.name,
//       role: req.body.role,
//       position: req.body.position,
//       password: req.body.password,
//     };

//     user.password = bcrypt.hashSync(req.body.password, 10);

//     const updatedFile = func.updateFile('users', user, req.body.name, 'update');

//     if (updatedFile === 'error') {
//       return res.status(403).json({
//         TYPE: 'GET',
//         status: 403,
//         message: 'Your request was not succesfull',
//       });
//     }

//     return res.status(200).json({
//       TYPE: 'POST',
//       status: 200,
//       info: {
//         name: req.body.name,
//         role: req.body.role,
//         position: req.body.position,
//         password: req.body.password,
//       },
//       message: 'User updated Successfully',
//     });
//   }

//   //  Module that delete user
//   static deleteUser(req, res) {
//     const deletedFile = func.deleteFile('users', req.body.name);

//     if (deletedFile === 'error') {
//       return res.status(403).json({
//         TYPE: 'GET',
//         status: 403,
//         message: 'Your request was not succesfull',
//       });
//     }

//     return res.status(200).json({
//       TYPE: 'POST',
//       status: 200,
//       info: deletedFile,
//       message: 'User Deleted Successfully',
//     });
//   }
}

export default Users;
