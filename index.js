import app from './api/app';
import {GLOBAL} from "./constants";
const {api} = GLOBAL;

app.listen(api.serverPort, () => {
  console.log(`Entorno de: ${process.env.NODE_ENV}`);
  console.log(`Servidor levantado en ${api.baseUrl}`);
});
