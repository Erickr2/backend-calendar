//este es un backend server
const express = require('express');
const { dbConnection } = require('./database/config');
require('dotenv').config(); //me ayuda a acceder a mis variables de entorno env
const cors = require('cors');

//creo el server 
const app = express();

//DB, funcion que se conecta ala bd
dbConnection();

//cors agrega una capa de seguridad para controlar quien puede hacer peticiones a mi api
app.use(cors())

//defino un directorio publico
app.use( express.static('public')); //establezco el directorio publico(es el path) //use es un midleware( funcion que se ejecuta cuando se hace una peticion al server)

//lectura y parseo del body
app.use(express.json()) //las peticiones que tengan formato json las proceso aqui y extraigo su contenido 

//Rutas
app.use('/api/auth', require('./routes/auth')); //todo lo que exporta este archivo(./routes/auth) esta disponible en la ruta(/api/auth)
app.use('/api/events', require('./routes/events'));



//escucho las peticiones. el callback se eejcuta cuando el server este arriba 
//process.env.PORT es mi variable de entorno, aqui declare mi puerto en el archvio .env
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
})