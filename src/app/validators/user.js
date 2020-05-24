const User = require('../models/User')

async function post(req, res , next){
     // check if has all field 
     const keys = Object.keys(req.body)

     for(key of keys){
         if(req.body[key] == ""){
             return  res.render('user/register',{
                user:req.body,
                error:'Preencha todos os Campos'
            })
       
         }
     }



     //check if user exists [email , cpf_cnpj]

     let {email, cpf_cnpj, password, passwordRepeat} = req.body

     cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
    

     const user =  await User.findOne({
         where: {email},
         or: {cpf_cnpj}
     })


     if (user) return res.render('user/register',{
         user:req.body,
         error:'Usuario ja Cadastrado'
     })


     //check if password match
     if(password != passwordRepeat) return res.render('user/register',{
        user:req.body,
        error:'Senhas e repetição de senha estão diferentes'
    })

     next()
}

module.exports = {
    post
}