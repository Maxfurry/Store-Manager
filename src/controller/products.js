import db from '../model/dbconfig';

class Product {
  // Module that gets all products
  static fetchProducts(req, res) {
    db.query('SELECT * from products', (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          err,
          message: 'Request to get all product was not succesfull',
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
        products: data.rows,
        message: 'Request to get all product successfull',
      });
    });
  }

  // Module that gets specific product
  static fetchProduct(req, res) {
    const id = req.params.productId;
    db.query('SELECT * from products WHERE id = $1', [id], (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          err,
          message: 'Request to get specific product was not succesfull',
        });
        return;
      }
      if (data.rowCount > 0) {
        res.status(200).json({
          success: true,
          product: data.rows,
          message: 'Request to get all product successfull',
        });
        return;
      }
      res.status(204).json({
        success: false,
        message: 'Request to get specific product was not succesfull',
      });
    });
  }

  static productExist(req, res, next) {
    db.query('SELECT * from products WHERE name = $1', [req.body.name], (err, data) => {
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
  }

  // Module that create new product
  static createProduct(req, res) {
    const product = [
      req.body.name,
      req.body.category,
      req.body.price,
      req.body.quantity,
    ];

    db.query('INSERT INTO products(name, category, price, quantity) VALUES($1,$2,$3,$4)', product, (err) => {
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
        product: {
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
        },
        message: 'Product Created Successfully',
      });
    });
  }

  //  updates Products
  static updateProduct(req, res) {
    const product = [
      req.body.name,
      req.body.category,
      req.body.price,
      req.body.quantity,
      req.params.productId,
    ];

    db.query('UPDATE products SET name=$1, category=$2, price=$3, quantity=$4 WHERE id=$5', product, (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          message: 'Your request was not succesfull, check product Id',
        });
        return;
      }
      if (data.rowCount < 1) {
        res.status(200).json({
          success: false,
          message: 'Product Id does not exist',
        });
        return;
      }
      res.status(200).json({
        success: true,
        product: {
          name: req.body.name,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
        },
        message: 'Product updated Successfully',
      });
    });
  }

  //  Module that delete user
  static deleteProduct(req, res) {
    db.query('DELETE from products WHERE id=$1', [req.params.productId], (err, data) => {
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
        message: 'Product Deleted Successfully',
      });
    });
  }
}

export default Product;
