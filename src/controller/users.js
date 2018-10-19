import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';

class users {
    // Module that create new user
    createUser (req, res, next) {
        let user = {
            name: req.body.name,
            role: req.body.role,
            position: req.body.position,
            password: req.body.password
        }

        user.password = bcrypt.hashSync(req.body.password, 10);

        fs.readFile('src/model/db/users.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects[req.body.name] = user;
            console.log(arrayOfObjects)

            fs.writeFile('src/model/db/users.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    let arrayOfObjects = {};        
                    arrayOfObjects = fs.readFileSync('src/model/db/users.json', 'utf-8');
                    arrayOfObjects = JSON.parse(arrayOfObjects);
                    return res.status(200).json({
                        TYPE: 'POST',
                        status: 200,
                        info: {
                          name: req.body.name,
                          role: req.body.role,
                          position: req.body.position,
                          password: req.body.password
                        },
                        message: 'User Created Successfully',
                      });
                }
            })
        })
    }

    // Module that logsin user
    loginUser (req, res, next) {
        let user = {
            name: req.body.name,
            role: req.body.role,
            position: req.body.position,
            password: req.body.password
        }

        let arrayOfObjects = {};        
        arrayOfObjects = fs.readFileSync('src/model/db/users.json', 'utf-8');
        arrayOfObjects = JSON.parse(arrayOfObjects);
        let password = arrayOfObjects[req.body.name].password;    

            const checkPassword = bcrypt.compareSync(req.body.password, password);
            if (checkPassword){
                const token = jwt.sign({
                    name: req.body.name,
                    role: req.body.role
                }, "lagretame", {
                    expiresIn: "240s"
                });
            
                return res.status(200).json({
                TYPE: 'POST',
                token: token,
                message: 'Login Successful',
            });
            } else {
            return res.status(403).json({
                TYPE: 'POST',
                status: 403,
                message: 'Invalid Credentials',
            });
            }
    }

    //Updates Users Information
    updateUser (req,res,next) {
        let user = {
            name: req.body.name,
            role: req.body.role,
            position: req.body.position,
            password: req.body.password
        }

        user.password = bcrypt.hashSync(req.body.password, 10);

        fs.readFile('src/model/db/users.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects[req.body.name] = user;
            console.log(arrayOfObjects)

            fs.writeFile('src/model/db/users.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    let arrayOfObjects = {};        
                    arrayOfObjects = fs.readFileSync('src/model/db/users.json', 'utf-8');
                    arrayOfObjects = JSON.parse(arrayOfObjects);
                    return res.status(200).json({
                        TYPE: 'POST',
                        status: 200,
                        info: {
                          name: req.body.name,
                          role: req.body.role,
                          position: req.body.position,
                          password: req.body.password
                        },
                        message: 'User Created Successfully',
                      });
                }
            })
        })
    }

    //Module that delete user
    deleteUser (req, res, next) {
        fs.readFile('src/model/db/products.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            let user = arrayOfObjects[req.body.name];
            delete arrayOfObjects[req.body.name];
            console.log(arrayOfObjects)

            return res.status(200).json({
                TYPE: 'POST',
                status: 200,
                info: user,
                message: 'User deleted Successfully',
              });
        })
    }
}

export default new users;