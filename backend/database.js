// Configura e inicializa la conexión a la base de datos

const mongoose = require('mongoose');

const { APP_HOST, APP_DATABASE } = process.env;

const MONGODB_URI = `mongodb://${APP_HOST}/${APP_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log("La base de datos está en línea"))
    .catch(err => console.log("Error: " + err));