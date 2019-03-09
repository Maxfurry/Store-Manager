import { pool } from '../model/dbconfig';

const productExist = (req, res, next) => {
  pool.query('SELECT * from products WHERE name = $1', [req.body.name], (err, data) => {
    if (err) {
      return err;
    }
    if (data.rowCount > 0) {
      return res.status(403).send({
        success: false,
        message: 'Product already exist',
      });
    }
    return next();
  });
};

export default productExist;
