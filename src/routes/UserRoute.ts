// UserRouter.ts
import { Router } from 'express';
import UserController from '../controllers/UserController';
const userRouter = Router();

userRouter.post('/createUser', UserController.createUser);
userRouter.get('/users', UserController.getUser);

export default userRouter;
