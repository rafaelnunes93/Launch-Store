const loadProductService = require('../services/LoadProductService');
const File = require('../models/File')

module.exports = {
    async index(req,res){
        try {
            const allProducts = await loadProductService.load('products')    
            const products = allProducts    
                .filter((product, index) => index > 2 ? false : true); 

            return  res.render("home/index",{products})        
        
    } catch (error) {
        console.error(error)
    }

    }
}