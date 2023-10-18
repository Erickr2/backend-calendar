const { Schema, model } = require('mongoose');


const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },   
    end: {
        type: String,
        required: true
    }, user: {
        type: Schema.Types.ObjectId, /* referencia */
        ref:'Usuario', /* ref: nombre de schema Usuario */
        required: true
    }

});

EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

//exporto el model y le paso el nombre del modelo y el schema del modelo
module.exports = model('Evento', EventoSchema);