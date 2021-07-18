const { response,request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {

    const {q,nombre="No name",apikey,page=1,limit=10} = req.query;

    res.json({
        msg:'get API - controller',
        q,nombre,apikey,page,limit
    })
};

const usuariosPost = async(req, res = response) => {


    const {nombre,correo,password,role} = req.body;
    const usuario = new Usuario({nombre,correo,password,role});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        return res.status(400).json({
            msg: 'El correo ya está registrado'
        });
    }

    //Encriptar la contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt);

    //Guardar en DB
    await usuario.save();

    res.json({
        msg:'get POST - controller',
        usuario
    })
};

const usuariosPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg:'get PUT - controller',
        id
    })
};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'get PATCH - controller'
    })
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'get DELETE - controller'
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};