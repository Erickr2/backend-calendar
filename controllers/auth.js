//controladores 
const { response } = require('express');
const { validationResult } = require('express-validator'); //resultado de la validacion


//funcion para crear usuarios, el response es para que me de la ayuda del intellisence, req solicita, res responde
const crearUsuario = (req, res = response) => {

    //extraigo lo que necesito del body de mi request, de esta manera leo lo que hay en mi body
    const {name, email, password} = req.body;

    //manejo de errores, los extraemos de validationResult y le mandamos el req ya que vamos a esperar que responde de esa req
    const errors = validationResult( req );

    //si el arreglo de rrores no esta vacion, es decir si hay errores; devuelve una respuesta y en los errores manda el mapeo de los mismos
    if( !errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    //si todo sale bien mando un 201 y la data
    res.status(201).json({
        ok: true,
        mssg: 'registro',
        name,
        email, 
        password
    })
}


const loginUsuario = (req, res = response) => {

    const { email, password} = req.body;
    const errors = validationResult( req );

    if( !errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    res.status(200).json({
        ok: true,
        mssg: 'login',
        email,
        password
    })
}


const revalidarToken = (req, res) => {
    res.json({
        ok: true,
        mssg: 'renew'
    })
}


//como se tienen varios controladores los exporto en un objeto 
module.exports = ({
    crearUsuario,
    loginUsuario,
    revalidarToken
})