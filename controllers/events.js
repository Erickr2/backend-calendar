const { response } = require("express");
const Evento = require("../models/evento");

const getEventos = async (req, res = response) => {
  const eventos = await Evento.find() //{}puedo mandar corchetes para condiciones
    .populate("user", "name"); // "populate" => trae toda la info de user
  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid; //obtengo el id del user del ui de mi req

    const eventoDB = await evento.save();

    res.status(200).json({
      ok: true,
      evento: eventoDB,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoID = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoID);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: `no existe un eventop con ese id`,
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No estas autorizado para realizar esta accion",
      });
    }

    const nuevoEvento = {
      ...req.body, //desestrcuturo todo lo que vemga en body
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoID,
      nuevoEvento,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoID = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoID);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: `no existe un evento con ese id`,
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No estas autorizado para realizar esta accion",
      });
    }

    const eventoEliminado = await Evento.findByIdAndDelete(eventoID);

    res.status(200).json({
      ok: true,
      evento: eventoEliminado,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      ok: false,
      msg: "hable con el admin",
    });
  }
};

module.exports = {
  getEventos,
  actualizarEvento,
  eliminarEvento,
  crearEvento,
};
