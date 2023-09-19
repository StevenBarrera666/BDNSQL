const { Router } = require('express');

const router = Router();
const { rootGet, createNewNote, getAllNotes, updateNote, deleteNote } = require('../controllers/notes.controllers');//desestructción

/* Peticiones GET en la raíz / */
router.get('/', rootGet)//Endpoint
router.post('/notes/create', createNewNote)
router.get('/notes', getAllNotes)
router.put('/notes/update/:id', updateNote); // Ruta para actualizar nota
router.delete('/notes/delete/:id', deleteNote); // Ruta para eliminar nota

module.exports = router;