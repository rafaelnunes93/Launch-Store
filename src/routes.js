const express = require('express');
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const productsController = require('./app/controllers/ProductController')
const homeController = require('./app/controllers/homeController')
const searchController = require('./app/controllers/searchController')



routes.get('/',homeController.index)

// Search
routes.get('/products/search',searchController.index)


//Products
routes.get('/products/create',productsController.create)
routes.get('/products/:id',productsController.show)
routes.get('/products/:id/edit',productsController.edit)

routes.post('/products',multer.array("photos",6),productsController.post)
routes.put('/products',multer.array("photos",6),productsController.put)
routes.delete('/products',productsController.delete)


//Alias
routes.get('/ads/create',function(req,res){
    return res.redirect("/products/create")
})





module.exports = routes