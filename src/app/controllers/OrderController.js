const loadProductService = require('../services/LoadProductService');
const User = require('../models/User')
const File = require('../models/File')

const mailer = require('../../lib/mailer');
const { product } = require('../services/LoadProductService');

const  email = (seller, product,buyer) => `
    <h2> Ola, ${seller.name} </h2>
    <p>voce tem o novo pedido de compra do seu produto</p>
    <p>Produto: ${product.name}</p>
    <p>preço: ${product.formattedPrice}
    <p></br> </br></p>

    <h3>Dados do comprador</h3>

    <p>Nome: ${buyer.name} </p>
    <p>Email: ${buyer.email} </p>
    <p>Endereco: ${buyer.address} </p>
    <p>Cep: ${buyer.cep} </p>

    <p></br> </br></p>

    <p><strong>Entre em contato com o comprador para finalizar a venda</strong></p>

    <p></br> </br></p>


`

module.exports = {

    async post(req,res){
        try {          
            //Pegar os dados do Produto
            const product = await loadProductService.load('product',{where:{
                id:req.body.id
            }})           

            //Pegar os dados do vendedor
            const seller = await User.findOne({where:{id:product.user_id}});

            //Pegar os dados do  Comprador
            const buyer = await User.findOne({where: {id:req.session.userId}})

            //Enviar email com dados da compra para o vendedor
            await mailer.sendMail({
                to:seller.email,
                from: 'no-reply@launchbase.com.br',
                subject: 'Novo pedido de compra',
                html:email(seller,product,buyer)
            })

            return res.render('orders/success')


        
    } catch (error) {
        console.error(error)
    }

    }
}