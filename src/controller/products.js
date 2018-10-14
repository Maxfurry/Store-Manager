class product {
    fetchProducts (req, res, next) {
        res.send("All Products");
    }
    
    fetchProduct  (req, res, next) {
        res.send("Single Product");   
    }

    createProduct (req, res, next) {
        res.send("Product Created");
    }
    
    // deleteProduct (req, res, next) {
        
    // }
    
    // updateProduct (req, res, next) {
        
    // }
}

export default new product;