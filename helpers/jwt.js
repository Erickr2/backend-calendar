//me ayuda a generar mi JWT
const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {
        
        //datos que me manda el usuario
        const payload = { uid, name };

        //sign me ayuda a firmar mi toke, tiene mi payload(info), mi firma secreta(private key), opciones y un callback que controla el error
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.log(err);
                reject('Error al generar token')
            }
            //si todo va bien mando el token
            resolve(token)
        } )
    });

}

module.exports = {
    generarJWT
}