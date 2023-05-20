const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        //promesa, es mi coneccion a la bd, espero su respuesta
        await mongoose.connect(process.env.DB_CNN, {
           
        });

        console.log('Conexion a DB exitosa')

    } catch (error) {
        console.log(error);
        throw new Error('No se pudo conectar a la BD')
    }
}

module.exports = {
    dbConnection,
}