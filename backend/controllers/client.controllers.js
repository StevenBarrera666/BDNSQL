const { request, response } = require("express");
const bcrypt = require("bcrypt");

const Client = require("../models/client");
const jwt = require("../helpers/jwt");

const register_client = async (req = request, res = response) => {
  try {
    const data = req.body;
    const clientExist = await Client.findOne({ email: data.email });

    if (clientExist) {
      return res
        .status(409)
        .send({
          msg: "El correo ya existe en la base de datos",
          data: undefined,
        });
    }
    if (!data.password) {
      return res
        .status(400)
        .send({ msg: "No hay una contraseña", data: undefined });
    }
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Guardar el registro de cliente en la base de datos
    const newClient = new Client({
      nombres: data.nombres,
      apellidos: data.apellidos,
      pais: data.pais,
      email: data.email,
      password: hashedPassword,
      telefono: data.telefono,
      genero: data.genero,
      f_nacimiento: data.f_nacimiento,
      dni: data.dni,
    });

    await newClient.save();

    res.status(201).send({ data: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor", data: undefined });
  }
};

const login_client = async (req = request, res = response) => {
  try {
    const data = req.body;

    // Verificar si el correo electrónico existe en la base de datos
    const client = await Client.findOne({ email: data.email });
    if (!client) {
      return res
        .status(404)
        .send({ msg: "El correo no está registrado", data: undefined });
    }

    // Verificar la coincidencia de contraseñas
    const passwordMatch = await bcrypt.compare(data.password, client.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .send({ msg: "Contraseña incorrecta", data: undefined });
    }

    // Generar el token de acceso
    const token = jwt.createToken(client);

    res.status(200).send({ data: { client, token } });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error en el servidor", data: undefined });
  }
};

module.exports = {
  register_client,
  login_client
};
