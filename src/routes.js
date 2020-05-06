const express = require('express');
const routes = express.Router()
const multer = require('./app/middlewares/multer')
const productsController = require('./app/controllers/ProductController')



routes.get('/',function(req, res){
    return res.render("layout.njk");
})

routes.get('/products/create',productsController.create)
routes.get('/products/:id/edit',productsController.edit)

routes.post('/products',multer.array("photos",6),productsController.post)
routes.put('/products',multer.array("photos",6),productsController.put)
routes.delete('/products',productsController.delete)


//Alias
routes.get('/ads/create',function(req,res){
    return res.redirect("/products/create")
})



module.exports = routes