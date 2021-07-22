const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { login,googleSignin } = require('../controllers/auth');

const router = Router();

router.post('/login',[
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),
    validarCampos
] ,login);


router.post('/google',[
    check('id_token','El ID token es obligatorio').not().isEmpty(),
    validarCampos
] ,googleSignin);

module.exports = router;