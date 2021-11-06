import express, { json, urlencoded } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from "cors";
import router from "../router";

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(urlencoded({extended:false}));
app.use(json());
app.use(cors());
app.use(router);

export default app;
