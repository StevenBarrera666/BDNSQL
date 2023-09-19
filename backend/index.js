require('dotenv').config();

const app = require('./server');
require("./database");

/* Escucha constante de peticiones HTTP */
app.listen(app.get('port'), function () {
    console.log('Servidor esta en puerto:', app.get('port'));
})