import { isDate } from "util";
import fs from "fs"

class sales {
    // Module that gets all sales
    fetchSaleRecords (req, res, next) {
        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            } 

            let arrayOfObjects = JSON.parse(data);

            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                info: arrayOfObjects,
                message: 'Request to get all records was successfull',
              });
        })
    }
    
    // Module that gets specific product
    fetchSaleRecord  (req, res, next) {
        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            } 
            let salesId = req.params.salesId;
            let arrayOfObjects = JSON.parse(data);
            data = arrayOfObjects[salesId];
           
            return res.status(200).json({
                TYPE: 'GET',
                status: 200,
                info: data,
                message: `Request to get record with ID:${salesId} was successfull`,
            });
        })      
    }

    // Module that create new product
    createSaleOrder (req, res, next) {
        let sales = {
            product: req.body.product,
            salesId: req.body.salesId,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            attendant: req.body.attendant,
            date: isDate
        }

        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data)=> {
            if (err) {
                console.log(err);
                throw err;
            }
            let arrayOfObjects = JSON.parse(data);
            arrayOfObjects[req.body.salesId] = sales;
            console.log(arrayOfObjects)

            fs.writeFile('src/model/db/sales.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
                if(err) {
                    console.log(err);
                    throw err;
                } else {
                    let arrayOfObjects = {};        
                    arrayOfObjects = fs.readFileSync('src/model/db/sales.json', 'utf-8');
                    arrayOfObjects = JSON.parse(arrayOfObjects);
                    return res.status(200).json({
                        TYPE: 'POST',
                        status: 200,
                        info: sales,
                        message: 'Record Successfully Saved',
                      });
                }
            })
        })
    }

    //Module that delete user
    deleteSaleRecord (req, res, next) {    
        fs.readFile('src/model/db/sales.json', 'utf-8', (err, data)=> {
           if (err) {
               console.log(err);
               throw err;
           }

           let arrayOfObjects = JSON.parse(data);
           let saleRecord = arrayOfObjects[req.body.salesId];
           delete arrayOfObjects[req.body.salesId];
           console.log(arrayOfObjects)

           fs.writeFile('src/model/db/sales.json', JSON.stringify(arrayOfObjects, null, 2), 'utf-8', (err) => {
            if(err) {
                console.log(err);
                throw err;
            } else {
                let arrayOfObjects = {};        
                arrayOfObjects = fs.readFileSync('src/model/db/sales.json', 'utf-8');
                arrayOfObjects = JSON.parse(arrayOfObjects);
                return res.status(200).json({
                    TYPE: 'POST',
                    status: 200,
                    info: saleRecord,
                    message: 'Record Deleted Successfully',
                  });
            }
        })    
       })
   }
    
    
    // updateSaleRecord (req, res, next) {
        
    // }
}

export default new sales;