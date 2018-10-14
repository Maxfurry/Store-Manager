class sales {
    fetchSaleRecords (req, res, next) {
        res.send("All Sales Records");
    }
    
    fetchSaleRecord  (req, res, next) {
        res.send("Single Sales Record");   
    }

    createSaleOrder (req, res, next) {
        res.send("Sale Order Created");
    }
    
    // deleteSaleRecord (req, res, next) {
        
    // }
    
    // updateSaleRecord (req, res, next) {
        
    // }
}

export default new sales;