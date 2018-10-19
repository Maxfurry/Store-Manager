import jwt from 'jsonwebtoken';
import fs from 'fs';

  let checkToken = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token)
      const decoded = jwt.verify(token, "lagretame");
      return next();
    } catch (err) {
      return res.status(403).json({
        status: 403,
        info: {
          name: err.name, 
          message: err.message, 
          expiered: err.expiredAt
        },
        message: 'Authentication fail, Please provide valid Token',
      });
    }
  }

  let checkAdmin = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, "lagretame");
      let name = req.body.name;

      //Check if it is an Admin
      fs.readFile('src/model/db/users.json', 'utf-8', (err, data) => {
        if (err) {
          console.log(err);
          return next(err);
        } 
        
        let arrayOfObjects = JSON.parse(data);
        let role = arrayOfObjects[name].role;
        if (role === 'admin') {
          return next();
        }

        return res.status(403).json({
          status: 403,
          info: {
            name: err.name, 
            message: err.message, 
            expiered: err.expiredAt
          },
          message: 'You are not authorized',
        });
      })   
    } catch (err) {
      console.log({name: err.name, 
                  message: err.message, 
                  expiered: err.expiredAt});
      return res.status(403).json({
        status: 403,
        info: {
          name: err.name, 
          message: err.message, 
          expiered: err.expiredAt
        },
        message: 'Authentication fail, Please provide valid Token',
      });
    }
  }

export default {checkToken, checkAdmin}