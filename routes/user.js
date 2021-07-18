const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { usuariosGet,usuariosPost,usuariosPut,usuariosPatch,usuariosDelete } = require('../controllers/user');

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
] ,usuariosPost);

router.put('/:id', usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/', usuariosDelete);

module.exports = router;