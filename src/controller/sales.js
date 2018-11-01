import db from '../model/dbconfig';

class Sales {
  // Module that gets all sales
  static fetchSaleRecords(req, res) {
    db.query('SELECT * from sales', (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          err,
          message: 'Request to get all sale records not succesfull',
        });
        return;
      }
      if (data.rowCount < 1) {
        res.status(204).json({
          success: false,
          message: 'No product exist in database',
        });
        return;
      }
      res.status(200).json({
        success: true,
        sales: data.rows,
        message: 'Request to get all sale records successfull',
      });
    });
  }

  // Module that gets specific product
  static fetchSaleRecord(req, res) {
    const id = req.params.salesId;
    db.query('SELECT * from sales WHERE id = $1', [id], (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          err,
          message: 'Request to get specific sale record was not succesfull',
        });
        return;
      }
      if (data.rowCount > 0) {
        res.status(200).json({
          success: true,
          sale: data.rows,
          message: 'Request to get specific sale record was not succesfull',
        });
        return;
      }
      res.status(204).json({
        success: false,
        message: 'Request to get specific sale record was not succesfull',
      });
    });
  }

  // Module that create new product
  static createSaleOrder(req, res) {
    const sale = [
      req.body.product,
      req.body.category,
      req.body.quantity,
      req.body.price,
      req.body.attendant,
    ];

    db.query('INSERT INTO sales(product, category, quantity, price, attendant ) VALUES($1,$2,$3,$4, $5)', sale, (err) => {
      if (err) {
        res.status(403).json({
          success: false,
          err,
          message: 'Your request was not succesfull',
        });
        return;
      }

      res.status(200).json({
        success: true,
        sale: {
          product: req.body.product,
          category: req.body.category,
          quantity: req.body.quantity,
          price: req.body.price,
          attendant: req.body.attendant,
        },
        message: 'Sale record created successfully',
      });
    });
  }

  //  Module that delete user
  static deleteSaleRecord(req, res) {
    db.query('DELETE from sales WHERE id=$1', [req.params.salesId], (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: 'Your request was not succesfull',
        });
        return;
      }
      if (data.rowCount < 1) {
        res.status(403).json({
          success: false,
          message: 'Product Id does not exist',
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Sale record deleted successfully',
      });
    });
  }
}

export default Sales;
