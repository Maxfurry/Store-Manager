import jwt from 'jsonwebtoken';

const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    //  console.log(token)
    jwt.verify(token, process.env.JWTKEY, (err) => {
      if (err) {
        return res.status(403).json({
          success: false,
          err,
          message: 'Authentication fail, Please provide valid Token',
        });
      }
      return next();
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      err,
      message: 'Authentication fail, Please provide valid Token',
    });
  }
};

const checkAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, process.env.JWTKEY, (err, tokenData) => {
      if (err) {
        return res.status(403).json({
          success: false,
          err,
          message: 'You are not authorized',
        });
      }
      //  Check if it is an Admin
      if (tokenData.role === 'admin') {
        return next();
      }
      return res.status(403).json({
        success: false,
        err,
        message: 'You are not authorized',
      });
    });
  } catch (err) {
    //    console.log(err);
    return res.status(403).json({
      success: false,
      err,
      message: 'Authentication fail, Please provide valid Token',
    });
  }
};

export default { checkToken, checkAdmin };
