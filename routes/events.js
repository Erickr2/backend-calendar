/* 
  Rutas de eventos  
  host + api/events
*/

const { Router } = require("express");
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos') //midleware para validar si los cheks tienen error
const { validarJWT } = require("../middlewares/validar-jwt");
const { isDate } = require('../database/isDate')
const { getEventos, actualizarEvento, eliminarEvento, crearEvento } = require("../controllers/events");
const router = Router();

router.use( validarJWT ) //cualquier peticion lleva este middleware

router.get("/", getEventos);

router.post("/",[
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha de incio es obligatoria').custom( isDate ),
  check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
  validarCampos
],crearEvento);

router.put("/:id",[
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'La fecha de incio es obligatoria').custom( isDate ),
  check('end', 'La fecha de finalizacion es obligatoria').custom( isDate ),
  validarCampos
], actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
