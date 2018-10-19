import jwt from 'jsonwebtoken';

  let checkToken = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token)
      jwt.verify(token, "lagretame", (err, tokenData) => {
        if(err) {
          return res.status(403).json({
            status: 403,
            info: err,
            message: 'Authentication fail, Please provide valid Token',
          }); 
        } else {
          return next();
        }
      });
    } catch (err) {
      return res.status(403).json({
        status: 403,
        info: err,
        message: 'Authentication fail, Please provide valid Token',
      });
    }
  }

  let checkAdmin = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1];

      jwt.verify(token, "lagretame", (err, tokenData) => {
        if(err) {
          return res.status(403).json({
            status: 403,
            info: err,
            message: 'You are not authorized',
          });
        } else {

          //Check if it is an Admin
          if(tokenData.role === "admin") {
            return next();
          } else {
            return res.status(403).json({
              status: 403,
              info: err,
              message: 'You are not authorized',
            });
          }
        }
      });    
    } catch (err) {
      console.log(err);
      return res.status(403).json({
        status: 403,
        info: err,
        message: 'Authentication fail, Please provide valid Token',
      });
    }
  }

export default {checkToken, checkAdmin}