import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

class Users {
// Module that create new user
  createUser(req, res, next) {
    const user = {
      name: req.body.name,
      role: req.body.role,
      position: req.body.position,
      password: req.body.password,
    };

    user.password = bcrypt.hashSync(req.body.password, 10);

    fs.readFile('src/model/db/users.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      let arrayOfObjects = JSON.parse(data);
      arrayOfObjects[req.body.name] = user;
      //  console.log(arrayOfObjects);

      fs.writeFile('src/model/db/users.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
        if (err) {
          //  console.log(err);
          throw err;
        } else {
          arrayOfObjects = fs.readFileSync('src/model/db/users.json', 'utf-8');
          arrayOfObjects = JSON.parse(arrayOfObjects);
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
      });
    });
    next();
  }

  // Module that logs in users
  loginUser(req, res) {
    let arrayOfObjects = fs.readFileSync('src/model/db/users.json', 'utf-8');
    arrayOfObjects = JSON.parse(arrayOfObjects);
    const password = arrayOfObjects[req.body.name].password;

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
        token: token,
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
  updateUser(req, res, next) {
    const user = {
      name: req.body.name,
      role: req.body.role,
      position: req.body.position,
      password: req.body.password,
    };

    user.password = bcrypt.hashSync(req.body.password, 10);

    fs.readFile('src/model/db/users.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      let arrayOfObjects = JSON.parse(data);
      arrayOfObjects[req.body.name] = user;
      //  console.log(arrayOfObjects)

      fs.writeFile('src/model/db/users.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
        if (err) {
          //  console.log(err);
          throw err;
        } else {
          arrayOfObjects = fs.readFileSync('src/model/db/users.json', 'utf-8');
          arrayOfObjects = JSON.parse(arrayOfObjects);
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
      });
    });
    next();
  }

  //  Module that delete user
  deleteUser(req, res, next) {
    fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      const arrayOfObjects = JSON.parse(data);
      const user = arrayOfObjects[req.body.name];
      //  delete arrayOfObjects[req.body.name];
      return res.status(200).json({
        TYPE: 'POST',
        status: 200,
        info: user,
        message: 'User deleted Successfully',
      });
    });
    next();
  }
}

const users = new Users();
export default users;
