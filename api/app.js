import express, { json, urlencoded } from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from "cors";

const app = express();

app.use(morgan('dev'));
app.use(urlencoded({extended:false}));
app.use(json());
app.use(cors());

export default app;
