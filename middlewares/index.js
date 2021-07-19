
const validaCampos = require('../middlewares/validar-campos');

const validarRoles = require('../middlewares/validar-roles');

const validarJWT = require('../middlewares/validar-jwt');

module.exports ={
    ...validaCampos,
    ...validarJWT,
    ...validarRoles
}
