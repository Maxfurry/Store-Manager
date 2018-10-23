import func from '../middlewares/functions';

class Product {
  // Module that gets all products
  static fetchProducts(req, res) {
    const products = func.readFile('products');

    if (!products) {
      return res.status(403).json({
        success: false,
        message: 'Request to get all product was not succesfull',
      });
    }
    return res.status(200).json({
      success: true,
      products,
      message: 'Request to get all product successfull',
    });
  }

  // Module that gets specific product
  static fetchProduct(req, res) {
    const product = func.readFile('products', req.params.productId);

    if (!product) {
      return res.status(403).json({
        success: false,
        message: 'Request to get specific product was not succesfull',
      });
    }
    return res.status(200).json({
      success: true,
      product,
      message: 'Request to get all product successfull',
    });
  }

  // Module that create new product
  static createProduct(req, res) {
    const product = {
      name: req.body.name,
      productId: req.body.productId,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const updatedFile = func.updateFile('products', product, req.body.productId, 'create');

    if (updatedFile === 'error') {
      return res.status(403).json({
        success: false,
        message: 'Your request was not succesfull',
      });
    }

    if (updatedFile === 'exist') {
      return res.status(403).json({
        success: false,
        message: 'Product already exist',
      });
    }

    return res.status(200).json({
      success: true,
      product,
      message: 'Product Created Successfully',
    });
  }

  //  updates Products
  static updateProduct(req, res) {
    const product = {
      name: req.body.name,
      productId: req.body.productId,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const updatedFile = func.updateFile('products', product, req.body.productId, 'update');

    if (updatedFile === 'error') {
      return res.status(403).json({
        success: false,
        message: 'Your request was not succesfull',
      });
    }

    return res.status(200).json({
      success: true,
      product,
      message: 'Product updated Successfully',
    });
  }

  //  Module that delete user
  static deleteProduct(req, res) {
    const deletedFile = func.deleteFile('products', req.body.productId);

    if (deletedFile === 'error') {
      return res.status(403).json({
        success: false,
        message: 'Your request was not succesfull',
      });
    }

    return res.status(200).json({
      success: true,
      product: deletedFile,
      message: 'Product Deleted Successfully',
    });
  }
}

export default Product;
