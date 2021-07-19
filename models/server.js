const express = require('express')
var cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares :: Funciones que añaden funcionalidad al web server (Se ejecuta cuando se levanta el servidor)
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Directorio publico :: función use usan los middlewares
        this.app.use(express.static('public'));

        //Lectura y parseo del body
        this.app.use(express.json());
    }

    routes() {
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.usuariosPath,require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;