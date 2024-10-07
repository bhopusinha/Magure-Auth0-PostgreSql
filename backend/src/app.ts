import express from "express";
import { auth, requiresAuth } from "express-openid-connect";
import env from "./config/environment.config";
import { studentRouter, userRouter } from "./api/index";
import cors from 'cors';


const app = express();

app.use(cors());
app.use(express.json());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: env.auth0.secret,
  baseURL: env.auth0.baseURL,
  clientID: env.auth0.clientID,
  issuerBaseURL: env.auth0.issuerBaseURL
};

app.use(auth(config));

app.use(userRouter);
app.use('/api/v1/students',studentRouter);


export default app;