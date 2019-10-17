import Server from './classes/server';
import { SERVER_PORT } from './global/environment';
import bodyParser = require('body-parser');
import router from './routes/router';
import cors = require('cors');

const server = Server.instance;

server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());
server.app.use(cors({origin: true, credentials: true}));
server.app.use('/', router);

server.start(() => {
  console.log(`Servidor corriendo en el puerto ${SERVER_PORT}`);
});