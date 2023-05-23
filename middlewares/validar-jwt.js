const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT =  (req, res = response, next) => {
    //pido el token, que esa en el header y tiene el nombre x-yoken
    const token = req.header('x-token');
    //si no vinene el token
    if( !token ){
        res.status(401).json({
            ok: false,
            mssg: 'No se recibio ningun token en la peticion'
        })
    }

    try {
        //verifico el token, mando el token y la secret key y extraigo del token el uid y el name 
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT
        )
        //asigno los valores que extraje para que pueda acceder a ellos 
        req.uid = uid;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            mssg: 'token no válido'
        })
    }

    next();
}

module.exports = {
    validarJWT
};