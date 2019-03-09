import { pool } from '../model/dbconfig';

class Product {
  // Module that gets all products
  static fetchProducts(req, res) {
    pool.query('SELECT * from products', (err, data) => {
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
    pool.query('SELECT * from products WHERE product_id = $1', [id], (err, data) => {
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
          message: 'Request to get specific product successfull',
        });
        return;
      }
      res.status(204).json({
        success: false,
        message: 'Request to get specific product was not succesfull',
      });
    });
  }

  // Module that create new product
  static createProduct(req, res) {
    const {
      name, price, quantity, category, url
    } = req.body;

    pool.query(`select createProduct('{"proName": "${name}", "proPrice": ${price}, "proQuantity": ${quantity}, "catName": "${category}", "url": "${url}"}')`, (err) => {
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
          imageUrl: req.body.url,
          category: req.body.category,
          price: req.body.price,
          quantity: req.body.quantity,
        },
        message: 'Product Created Successfully',
      });
    });
  }

  //  Module that updates specific product
  static updateProduct(req, res) {
    const product = [
      req.body.name,
      req.body.price,
      req.body.quantity,
      req.params.productId,
    ];

    pool.query('UPDATE products SET name=$1, price=$2, quantity=$3 WHERE product_id=$4', product, (err, data) => {
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

  //  Module that delete specific product
  static deleteProduct(req, res) {
    pool.query('DELETE from products WHERE product_id=$1', [req.params.productId], (err, data) => {
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
