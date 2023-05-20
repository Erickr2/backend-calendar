/* 
  Rutas de usuarios / auth 
  host + api/auth
*/
const { Router } = require("express");
const router = Router();

//extraigo las funciones de mis controllers
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");


//endpoints mando la ruta, validaciones y la funcion que quiero que ejecute 
router.post(
    '/new',
    [//middlewares
        check('name', 'el nombre es obligatorio').not().isEmpty(), //1er campo: valor, 2do: mensaje de error, y que no sea vacio
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe ser de mas de 6 caracteres').isLength({min: 6}),
        validarCampos //middleware que me ayuda a validar mis peticiones
    ],
    crearUsuario
); //como es post recibe informacion; en este caso usuario y contraseña y correo, []

router.post(
    '/', 
    [
        check('email', 'el email es obligatorio').isEmail(),
        check('password', 'el password debe tener mas de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ], 
    loginUsuario); //como es post recibe informacion; en este caso correo y contraseña

router.get('/renew', revalidarToken);



//exporto mis rutas
module.exports = router;