// UserRouter.ts
import { Router } from 'express';
import UserController from '../controllers/UserController';
import auth from '../controllers/auth';

const userRouter: Router = Router();

userRouter.post('/createUser', auth.signUp);
userRouter.post('/signIn', auth.signIn)
userRouter.get('/users', UserController.getUser);

export default userRouter;
