import { Router } from "express";
import { createUser, getUser, updateUser, userDelete } from "./user.controller";


const userRouter = Router();

userRouter.route('/').post(createUser).get(getUser);
userRouter.route('/:id').patch(updateUser).delete(userDelete);


export default userRouter;

