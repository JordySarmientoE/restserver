const { response,request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const {q,nombre="No name",apikey,page=1,limit=10} = req.query;

    res.json({
        msg:'get API - controller',
        q,nombre,apikey,page,limit
    })
};

const usuariosPost = (req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg:'get POST - controller',
        nombre,
        edad
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
}