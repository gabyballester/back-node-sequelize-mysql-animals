import app from './api/app';
import { GLOBAL } from "./constants";
const { api } = GLOBAL;
import { dbConnection } from "./database/dbConnection";


dbConnection.sync({ force: false })
  .then(() => {
    console.log('Conectado a MySQL, a través de Sequelize');
    app.listen(api.serverPort, () => {
      console.log(`Entorno de: ${process.env.NODE_ENV}`);
      console.log(`Servidor levantado en ${api.baseUrl}`);
    });
  }).catch((error) => console.log(error))

