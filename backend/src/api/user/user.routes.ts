import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { checkUser, getProfile } from "./user.controller";


const userRouter = Router();


userRouter.route('/').get(checkUser);
userRouter.route('/profile').get(requiresAuth(),getProfile);


export default userRouter;

