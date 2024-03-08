import {Request, Response} from 'express'
import { prisma } from '../database'
export default {
    async createMovie(request: Request , response: Response){
        try{
            const {title, sinopse, image} = request.body;
            const existingMovie = await prisma.movie.findUnique({where: {image, title}});
            if(existingMovie) {
                return response.status(400).json({
                    error: true,
                    message: "Esse filme já foi cadastrado"
                });
            };

            const movieCreated = await prisma.movie.create({
                data: {
                    title,
                    sinopse,
                    image
                }
            })

            return response.json({
                message: "Filme cadastrado!!!",
                movieCreated
            })
           
        } catch(err){
            return response.json({
                error: true,
                message: "Ocorreu um erro ao cadastrar um filme",
                details: err.message
            })
        }
    },
    async getMovies(request: Request, response: Response){
        try{
            const movies = await prisma.movie.findMany();
            if (movies.length <= 0){
                return response.status(400).json({
                    message: "Não há filmes cadastrados",
                })
            }
            return response.json({
                movies
            })
        }catch(err){
            return response.json({
                message: err.message
            })
        }
    },
    async deleteMovie(request: Request, response: Response){
        try{
            const {id} = request.params;
            const movieDeleted = await prisma.movie.delete({where: {id: Number(id)}})
            const existingMovie = await prisma.movie.findUnique({where: {id: Number(id)}});
            if (!existingMovie) {
                return response.json(400).json({
                    message: "Não há nenhum filme com esse id"
                });
            };
            return response.json({
                movieDeleted
            })
        } catch(err){
            return response.status(400).json({
                message: err.message
            })
        }
    }
}