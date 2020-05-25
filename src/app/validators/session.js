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
    


module.exports = {
    login
}