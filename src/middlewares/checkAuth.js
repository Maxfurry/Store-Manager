import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //  console.log(token)
    jwt.verify(token, 'lagretame', (err, tokenData) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          info: err,
          message: 'Authentication fail, Please provide valid Token',
        });
      }
      return next();
    });
  } catch (err) {
    return res.status(403).json({
      status: 403,
      info: err,
      message: 'Authentication fail, Please provide valid Token',
    });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, 'lagretame', (err, tokenData) => {
      if (err) {
        return res.status(403).json({
          status: 403,
          info: err,
          message: 'You are not authorized',
        });
      }

      //  Check if it is an Admin
      if (tokenData.role === 'admin') {
        return next();
      }
      return res.status(403).json({
        status: 403,
        info: err,
        message: 'You are not authorized',
      });
    });
  } catch (err) {
    //  console.log(err);
    return res.status(403).json({
      status: 403,
      info: err,
      message: 'Authentication fail, Please provide valid Token',
    });
  }
};

export default { checkToken, checkAdmin };
