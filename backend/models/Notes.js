const { Schema, model } = require('mongoose');

const NoteSchema = new Schema({
    id: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
}, { timestamps: true })

module.exports = model('Note', NoteSchema);