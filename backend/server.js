/* Inicializa y configura el servidor de express */

/* Importar modulos en Node */
const express = require('express');
//politicas CORS de cross origin (permite comunicación desde la misma IP)
const cors = require('cors');



/* Inicialización */
const app = express();

app.use(cors());

/* Configuración inicial */
app.set('port', process.env.PORT || 3002);



/* Middleware */
app.use(express.urlencoded({ extended: true }));
//Permite el uso de request en formato json
app.use(express.json());
/* Meramente un log de lo que estamos recibiendo como request */
app.use((req, res, next) => {
    // Registra la información de la solicitud en la consola
    console.log(`Recibida solicitud ${req.method} en ${req.originalUrl}`);
    console.log('Encabezados:', req.headers);
    console.log('Cuerpo:', req.body); // Esto mostrará el cuerpo de la solicitud POST

    // Continúa con el flujo normal de manejo de la solicitud
    next();
});

/* Rutas */
app.use(require('./routes/notes.routes'));
app.use(require('./routes/client.routes'));

module.exports = app;