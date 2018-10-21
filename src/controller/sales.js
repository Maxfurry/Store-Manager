import { isDate } from 'util';
import fs from 'fs';

class Sales {
    // Module that gets all sales
    static fetchSaleRecords(req, res) {
        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }

            const arrayOfObjects = JSON.parse(data);

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                info: arrayOfObjects,
                message: 'Request to get all records was successfull',
            });
        });
    }

    // Module that gets specific product
    static fetchSaleRecord(req, res) {
        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }

            const salesId = req.params.salesId;
            const arrayOfObjects = JSON.parse(data);
            const detail = arrayOfObjects[salesId];

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                info: detail,
                message: `Request to get record with ID:${salesId} was successfull`,
            });
        });
    }

    // Module that create new product
    static createSaleOrder(req, res) {
        const sales = {
            product: req.body.product,
            salesId: req.body.salesId,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            attendant: req.body.attendant,
            date: isDate,
        };

        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects[req.body.salesId] = sales;
            //  console.log(arrayOfObjects)

            fs.writeFile('src/model/db/sales.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (error) => {
                if (error) {
                    //  console.log(error);
                    throw error;
                } else {
                    arrayOfObjects = fs.readFileSync('src/model/db/sales.json', 'utf-8');
                    arrayOfObjects = JSON.parse(arrayOfObjects);
                    return res.status(200).json({
                        TYPE: 'POST',
                        status: 200,
                        info: sales,
                        message: 'Record Successfully Saved',
                    });
                }
            });
        });
    }

    //  Module that delete user
    static deleteSaleRecord(req, res) {
        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data) => {
            if (err) {
                //  console.log(err);
                throw err;
            }

            let arrayOfObjects = JSON.parse(data);
            const saleRecord = arrayOfObjects[req.body.salesId];
            delete arrayOfObjects[req.body.salesId];
            // console.log(arrayOfObjects);

            fs.writeFile('src/model/db/sales.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (error) => {
                if (error) {
                    //  console.log(error);
                    throw error;
                } else {
                    arrayOfObjects = fs.readFileSync('src/model/db/sales.json', 'utf-8');
                    arrayOfObjects = JSON.parse(arrayOfObjects);
                    return res.status(200).json({
                        TYPE: 'POST',
                        status: 200,
                        info: saleRecord,
                        message: 'Record Deleted Successfully',
                    });
                }
            });
        });
    }

    // updateSaleRecord (req, res, next) {
    // }
}

export default Sales;
