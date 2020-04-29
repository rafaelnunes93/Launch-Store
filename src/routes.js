const express = require('express');
const routes = express.Router()
const productsController = require('./app/controllers/ProductController')



routes.get('/',function(req, res){
    return res.render("layout.njk");
})

routes.get('/products/create',productsController.create)
routes.post('/products',productsController.post)

//Alias
routes.get('/ads/create',function(req,res){
    return res.redirect("/products/create")
})



module.exports = routes