import {Router, Request, Response} from 'express';
import UserController from '../controllers/UserController';

const route = Router();

route.post('/createUser', UserController.createUser);
route.get('/users', UserController.getUser)

export default route