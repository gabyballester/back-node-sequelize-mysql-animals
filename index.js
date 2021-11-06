import app from './api/app';

const {SERVER_HOST, SERVER_PORT, NODE_ENV} = process.env;

app.listen(SERVER_PORT, () => {
  console.log(NODE_ENV);
  console.log(`Servidor levantado en http://${SERVER_HOST}:${SERVER_PORT}`);
});
