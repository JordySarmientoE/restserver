const express = require('express')
var cors = require('cors')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares :: Funciones que añaden funcionalidad al web server (Se ejecuta cuando se levanta el servidor)
        this.middlewares();

        //Rutas de la aplicación
        this.routes();
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
        this.app.use(this.usuariosPath,require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;