import 'reflect-metadata';
import express from "express";
import { auth} from "express-openid-connect";
import env from "./config/environment.config";
import cors from 'cors';
import AppDataSource from "./config/database.config";
import {userRouter} from './api/index';
import morgan from 'morgan';


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


AppDataSource.initialize().then(()=>{
    console.log(`dataSource is connected successfully!`);
}).catch((err)=>{
  console.log('ERROR CONNECTING WITH DATABSE',err);
})

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: env.auth0.secret,
  baseURL: env.auth0.baseURL,
  clientID: env.auth0.clientID,
  issuerBaseURL: env.auth0.issuerBaseURL
};

app.use(auth(config));
app.use('/api/user',userRouter)


export default app;