const Note = require('../models/Notes')
/* Contentradas las funciones que controlen operaciones con las notas */
const notesController = {};

notesController.rootGet = (req, res) => {
    res.send("Hola mundo")
}

notesController.createNewNote = async (req, res) => {
    /* Aqui va la logica de la creación en base de datos */
    //res.send("Creando nota")
    /* Por si falla algo, esta el try */
    try {
        // Verifica si el cuerpo de la solicitud contiene datos
        if (!req.body || !req.body.titulo || !req.body.contenido) {
            return res.status(400).json({ error: 'Los datos de la nota son requeridos' });
        }

        // Obtén los datos de la nota del cuerpo de la solicitud
        const { id, titulo, contenido } = req.body;

        // Crea una nueva instancia del modelo de nota
        const nuevaNota = new Note({
            id,
            titulo,
            contenido,
        });

        // Guarda la nueva nota en la base de datos
        const notaGuardada = await nuevaNota.save();

        // Envía la nota guardada como respuesta en formato JSON
        res.json(notaGuardada);
    } catch (error) {
        console.error('Error al crear la nota:', error);
        res.status(500).json({ error: 'Error al crear la nota' });
    }
}

notesController.getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find({})//SELECT * FROM table 

        console.log(notes);
        res.json(notes || []);
    } catch (error) {
        console.error('Error al obtener notas:', error);
        res.status(500).json({ error: 'Error al obtener notas' });
    }
}

notesController.updateNote = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID de la nota a actualizar desde los parámetros de la URL

        // Verifica si el cuerpo de la solicitud contiene datos
        if (!req.body || !req.body.titulo || !req.body.contenido) {
            return res.status(400).json({ error: 'Los datos de la nota son requeridos' });
        }

        // Actualiza la nota en la base de datos
        const notaActualizada = await Note.findByIdAndUpdate(id, {
            titulo: req.body.titulo,
            contenido: req.body.contenido,
        }, { new: true }); // { new: true } devuelve la nota actualizada en lugar de la antigua

        if (!notaActualizada) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        // Envía la nota actualizada como respuesta en formato JSON
        res.json(notaActualizada);
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        res.status(500).json({ error: 'Error al actualizar la nota' });
    }
}

notesController.deleteNote = async (req, res) => {
    try {
        const { id } = req.params; // Obtiene el ID de la nota a eliminar desde los parámetros de la URL

        // Busca la nota por ID y elimínala
        const notaEliminada = await Note.findByIdAndDelete(id);

        if (!notaEliminada) {
            return res.status(404).json({ error: 'Nota no encontrada' });
        }

        // Envía un mensaje de éxito como respuesta
        res.json({ message: 'Nota eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        res.status(500).json({ error: 'Error al eliminar la nota' });
    }
}


module.exports = notesController