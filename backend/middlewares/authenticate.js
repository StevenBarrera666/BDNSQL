const jwt = require('jsonwebtoken');
const { isBefore, parseISO } = require('date-fns');

const secret = process.env.JWT_SECRET; // Utiliza la variable de entorno como clave secreta

exports.auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Falta Encabezado De Autorizacion' });
    }

    const token = req.headers.authorization.replace(/['"]+/g, '');

    const segmentos = token.split('.');
    if (segmentos.length !== 3) {
        return res.status(401).send({ message: 'Formato Token Invalido' });
    }

    let payload;
    try {
        payload = jwt.verify(token, secret); // Utiliza directamente la variable de entorno
        if (isBefore(parseISO(new Date()), parseISO(new Date(payload.exp * 1000)))) {
            return res.status(401).send({ message: 'Token Expirado' });
        }
    } catch (error) {
        return res.status(401).send({ message: 'Token Invalido' });
    }

    req.user = payload;
    next();
};
