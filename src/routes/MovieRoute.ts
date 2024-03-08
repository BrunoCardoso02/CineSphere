import { Router } from "express";
import MovieController from "../controllers/MovieController";

const movieRouter = Router();

movieRouter.post('/createMovie', MovieController.createMovie);
movieRouter.get('/movies', MovieController.getMovies);
movieRouter.delete('/deleteMovie/:id', MovieController.deleteMovie);

export default movieRouter
