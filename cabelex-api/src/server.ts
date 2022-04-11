import express from "express";
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';

import {router} from './routes';
import "./database";
import { CheckErrors } from "./middleware/CheckErrors";


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api',router);
app.use(CheckErrors);
app.listen(3001,()=> console.log("server started"))