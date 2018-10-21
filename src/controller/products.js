import fs from 'fs';

class Product {
    // Module that gets all products
    static fetchProducts(req, res) {
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
    }

    // Module that gets specific product
    static fetchProduct(req, res) {
        fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }
            const productId = req.params.productId;
            const arrayOfObjects = JSON.parse(data);
            const detail = arrayOfObjects[productId];

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                info: detail,
                message: `Request to get ${productId} successfull`,
            });
        });
    }

    // Module that create new product
    static createProduct(req, res) {
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

            fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (error) => {
                if (error) {
                    //  console.log(error);
                    throw error;
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

        fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects[req.body.productId] = product;
            //  console.log(arrayOfObjects)

            fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (error) => {
                if (error) {
                    //  console.log(error);
                    throw error;
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
    }

    //  Module that delete user
    static deleteProduct(req, res) {
        fs.readFile('src/model/db/products.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            const product = arrayOfObjects[req.body.productId];
            delete arrayOfObjects[req.body.productId];
            //  console.log(arrayOfObjects)

            fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (error) => {
                if (error) {
                    //  console.log(error);
                    throw error;
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
    }
}

export default Product;
