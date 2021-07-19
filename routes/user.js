const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,usuariosPost,usuariosPut,usuariosDelete,usuariosGetById } = require('../controllers/user');

const {validarCampos,tieneRole,validarJWT} = require('../middlewares');

const router = Router();



router.get('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosGetById);

router.get('/', usuariosGet);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser más de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    //check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom(esRoleValido),
    validarCampos
] ,usuariosPost);

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE'),
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosDelete);

module.exports = router;