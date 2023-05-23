//controladores 

const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario'); //exporto mi modelo
const { generarJWT } = require('../helpers/jwt');


//funcion para crear usuarios, el response es para que me de la ayuda del intellisence, req solicita, res responde
const crearUsuario = async (req, res = response) => {

    //extraigo lo que necesito del body de mi request, de esta manera leo lo que hay en mi body
    const { email, password } = req.body;

    try {

        //reviso si hay un usuario con el email que recibo
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                mssg: `Ya existe un usuario con el correo ${email}`
            })
        }

        //instancia de mi modelo
        usuario = Usuario(req.body);//le mando la info de mi request a mi modelo

        //encriptar contraseña 
        const salt = bcrypt.genSaltSync();//numero de vueltas por defecto 10
        usuario.password = bcrypt.hashSync(password, salt);//le mando la contra y mi n de vueltas
        //espero a que guarde en bd
        await usuario.save()
        //genero mi token, mando los datos y lo guardo en la constante token
        const token = await generarJWT( usuario.id, usuario.name);

        //si todo sale bien mando un 201 y la data junto con el token
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mssg: 'Hubo un error con el servidor, por favor hable con el Admin'
        })
    }


}

const loginUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ email });

        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                mssg: `No existe un usuario con el email ${email}`
            })
        }

        //confirmar passwords
        const validPass = bcrypt.compareSync( password, usuario.password);// comparo la contra que recibo y la que hay en la bd del usuario que recibo

        if( !validPass ){
            return res.status(400).json({
                ok: false,
                mssg: 'contraseña incorrecta'
            })
        }

        //generar JWT
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            mssg: 'Hubo un error con el servidor, por favor hable con el Admin'
        })
    }

    
}

//con esta funcion verifico si el token esta activo y si no genero uno nuevo, lo hace mi middleware
const revalidarToken = async(req, res) => {

    const { uid, name } = req; 
    //genero un nuevo token
    const token = await generarJWT( uid, name );

    res.json({
        ok: true,
        token
    })
}


//como se tienen varios controladores los exporto en un objeto 
module.exports = ({
    crearUsuario,
    loginUsuario,
    revalidarToken
})







/* 

//manejo de errores, los extraemos de validationResult y le mandamos el req ya que vamos a esperar que responde de esa req
    const errors = validationResult( req );

    //si el arreglo de rrores no esta vacion, es decir si hay errores; devuelve una respuesta y en los errores manda el mapeo de los mismos
    if( !errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

*/