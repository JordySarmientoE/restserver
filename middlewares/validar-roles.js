const { response, request } = require('express');

const esAdminRole = (req,res=responde,next) =>{
    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token'
        });
    }
    
    const {role, nombre} = req.usuario;

    if(role!=='ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - NEGADO`
        })
    }
    
    next();

}

const tieneRole = (...roles) =>{
    return (req,res=responde,next) =>{
        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin verificar el token'
            });
        }
        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            })
        }
        next();
    }

}

module.exports = {
    esAdminRole,
    tieneRole
}