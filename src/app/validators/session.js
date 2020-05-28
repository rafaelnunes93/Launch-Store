const User = require('../models/User')
const {compare} = require('bcryptjs')



async function login(req,res,next){
    const {email, password} = req.body
    //verificar se o usuario esta cadastrado
    const user = await User.findOne({where: {email} })

    if(!user) return res.render("session/login",{
        user: req.body,
        error: "Usuario não Cadastrado !"
    })

    //verificar se o password confere
    const passed = await compare(password, user.password)

    if(!passed) return res.render("session/login",{
        user: req.body,
        error: "Senha incorreta."
    })

    //colocar o usuario  no req.session
    req.user = user

    next()
}

async function forgot(req, res , next){
    const {email} = req.body

    try {
        
        let user = await User.findOne({where :{email}})

        if(!user) return res.render("session/forgot-password",{
            user: req.body,
            error: "Email não Cadastrado"
        })

        req.user = user

        next()

    } catch (err) {
        console.error(err)
    }

   
}
    
async function reset(req, res , next){
            const {email, password, passwordRepeat, token} = req.body
            //verificar se o usuario esta cadastrado
            const user = await User.findOne({where: {email} })

            if(!user) return res.render("session/password-reset",{
                user: req.body,
                token,
                error: "Usuario não Cadastrado !"
            })

            //verificar se a senha é valida 
            if(password != passwordRepeat) return res.render('session/password-reset',{
                user:req.body,
                token,
                error:'Senhas e repetição de senha estão diferentes'
            })

            //verifica se o token é valido
            
            if(token != user.reset_token) return res.render('session/password-reset',{                
                user:req.body,
                token,
                error:'Token invalido! Solicite uma nova recuperação de Senha'                
            
            })           

            
            
            //verifica se o token não esta expirado
            let now = new Date()
            now = now.setHours(now.getHours())
            if(now > user.reset_token) return res.render('session/password-reset',{
                user:req.body,
                token,
                error:'Token expirado! Solicite uma nova recuperação de Senha'
            })

            req.user = user
            next()
            

}


module.exports = {
    login,
    forgot,
    reset
}