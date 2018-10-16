import fs from "fs"

class product {
    // Module that gets all products
    fetchProducts (req, res, next) {
        fs.readFile('src/model/db/products.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            } 

            let arrayOfObjects = JSON.parse(data);

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                data: arrayOfObjects,
                message: 'Request to get all product successfull',
              });
        })
    }

    // Module that gets specific product
    fetchProduct  (req, res, next) {
        fs.readFile('src/model/db/products.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            } 
            let productId = req.params.productId;
            let arrayOfObjects = JSON.parse(data);
            data = arrayOfObjects[productId];
           
            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                data: data,
                message: `Request to get ${productId} successfull`,
            });
        })   
    }

    // Module that create new product
    createProduct (req, res, next) {
        let product = {
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity
        }

        fs.readFile('src/model/db/products.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects[req.body.name] = product;
            console.log(arrayOfObjects)

            fs.writeFile('src/model/db/products.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    let arrayOfObjects = {};        
                    arrayOfObjects = fs.readFileSync('src/model/db/products.json', 'utf-8');
                    arrayOfObjects = JSON.parse(arrayOfObjects);
                    res.status(500).send(arrayOfObjects);
                    console.log('saved');
                }
            })
        })
    }
    
    // deleteProduct (req, res, next) {
        // deleteCourse (key) {
        //     let arrayOfObjects = {};        
        //     arrayOfObjects = fs.readFileSync('model/db/class.json', 'utf-8');
        //     arrayOfObjects = JSON.parse(arrayOfObjects);
        //     delete arrayOfObjects[key];
        // }
    // }
    
    // updateProduct (req, res, next) {
        
    // }
}

export default new product;