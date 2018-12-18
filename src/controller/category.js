import db from '../model/dbconfig';

class Category {
  // Module that gets all products
  static fetchCategories(req, res) {
    db.query('SELECT * from categories', (err, data) => {
      if (err) {
        res.status(403).json({
          success: false,
          err,
          message: 'Request to get all categories was not succesfull',
        });
        return;
      }
      if (data.rowCount < 1) {
        res.status(204).json({
          success: false,
          message: 'No category exist in database',
        });
        return;
      }
      res.status(200).json({
        success: true,
        products: data.rows,
        message: 'Request to get all categories successfull',
      });
    });
  }

  // Module that create new product
  static createCategory(req, res) {
    db.query('INSERT INTO categories', req.body.category, (err) => {
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
        product: req.body.category,
        message: 'category Created Successfully',
      });
    });
  }

  //  Module that delete user
  static deleteCategory(req, res) {
    db.query('DELETE from categories WHERE id=$1', [req.params.catId], (err, data) => {
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
          message: 'Category Id does not exist',
        });
        return;
      }
      res.status(200).json({
        success: true,
        message: 'Category Deleted Successfully',
      });
    });
  }
}

export default Category;
