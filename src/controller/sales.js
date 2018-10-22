import { isDate } from 'util';
import func from '../middlewares/functions';

class Sales {
    // Module that gets all sales
    static fetchSaleRecords(req, res) {
        const sales = func.readFile('sales');

        if (!sales) {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Request to get all product was not succesfull',
            });
        }
        return res.status(200).json({
            TYPE: 'GET',
            status: 200,
            info: sales,
            message: 'Request to get all product successfull',
        });
    }

    // Module that gets specific product
    static fetchSaleRecord(req, res) {
        const sales = func.readFile('sales', req.params.salesId);

        if (!sales) {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Request to get all product was not succesfull',
            });
        }
        return res.status(200).json({
            TYPE: 'GET',
            status: 200,
            info: sales,
            message: 'Request to get all product successfull',
        });
    }

    // Module that create new product
    static createSaleOrder(req, res) {
        const sale = {
            product: req.body.product,
            salesId: req.body.salesId,
            category: req.body.category,
            quantity: req.body.quantity,
            price: req.body.price,
            attendant: req.body.attendant,
            date: isDate,
        };

        const updatedFile = func.updateFile('sales', sale, req.body.salesId);

        if (updatedFile === 'error') {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Your request was not succesfull',
            });
        }

        return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: sale,
            message: 'Product Created Successfully',
        });
    }

    //  Module that delete user
    static deleteSaleRecord(req, res) {
        const deletedFile = func.deleteFile('sales', req.body.salesId);

        if (deletedFile === 'error') {
            return res.status(403).json({
                TYPE: 'GET',
                status: 403,
                message: 'Your request was not succesfull',
            });
        }

        return res.status(200).json({
            TYPE: 'POST',
            status: 200,
            info: deletedFile,
            message: 'Product Deleted Successfully',
        });
    }

    // updateSaleRecord (req, res, next) {
    // }
}

export default Sales;
