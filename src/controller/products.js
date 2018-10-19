import fs from 'fs';

class Product {
  // Module that gets all products
  fetchProducts(req, res, next) {
    fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }

      const arrayOfObjects = JSON.parse(data);

      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        info: arrayOfObjects,
        message: 'Request to get all product successfull',
      });
    });
    next();
  }

  // Module that gets specific product
  fetchProduct(req, res, next) {
    fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      const productId = req.params.productId;
      const arrayOfObjects = JSON.parse(data);
      const details = arrayOfObjects[productId];

      return res.status(200).json({
        TYPE: 'GET',
        status: 200,
        info: details,
        message: `Request to get ${productId} successfull`,
      });
    });
    next();
  }

  // Module that create new product
  createProduct(req, res, next) {
    const product = {
      name: req.body.name,
      productId: req.body.name,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      let arrayOfObjects = JSON.parse(data);
      arrayOfObjects[req.body.productId] = product;
      //  console.log(arrayOfObjects);

      fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
        if (err) {
          //  console.log(err);
          throw err;
        } else {
          arrayOfObjects = fs.readFileSync('src/model/db/products.json', 'utf-8');
          arrayOfObjects = JSON.parse(arrayOfObjects);
          return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: product,
            message: 'Product Created Successfully',
          });
        }
      });
    });
    next();
  }

  //  updates Products
  updateProduct(req, res, next) {
    const product = {
      name: req.body.name,
      productId: req.body.productId,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      let arrayOfObjects = JSON.parse(data);
      arrayOfObjects[req.body.productId] = product;
      //  console.log(arrayOfObjects)

      fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
        if (err) {
          //  console.log(err);
          throw err;
        } else {
          arrayOfObjects = fs.readFileSync('src/model/db/products.json', 'utf-8');
          arrayOfObjects = JSON.parse(arrayOfObjects);
          return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: product,
            message: 'Product Updated Successfully',
          });
        }
      });
    });
    next();
  }

  //  Module that delete user
  deleteProduct(req, res, next) {
    fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
      if (err) {
        //  console.log(err);
        throw err;
      }
      let arrayOfObjects = JSON.parse(data);
      const product = arrayOfObjects[req.body.productId];
      delete arrayOfObjects[req.body.productId];
      //  console.log(arrayOfObjects)

      fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
        if (err) {
          //  console.log(err);
          throw err;
        } else {
          arrayOfObjects = fs.readFileSync('src/model/db/products.json', 'utf-8');
          arrayOfObjects = JSON.parse(arrayOfObjects);
          return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: product,
            message: 'Product Successfully Deleted',
          });
        }
      });
    });
    next();
  }
}

const product = new Product();
export default product;
