const express = require('express');
const routes = express.Router()

const homeController = require('../app/controllers/homeController')

const products = require('./products')
const users = require('./users')

routes.get('/',homeController.index)

routes.use('/products',products)
routes.use('/users',users)

//Alias
routes.get('/ads/create',function(req,res){
    console.log("criaproduto")
    return res.redirect("/products/create");    
})

routes.get('/accounts',function(req,res){
    console.log("fazlogin")
    return res.redirect("/users/login");
})

module.exports = routes