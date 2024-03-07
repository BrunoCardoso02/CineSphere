import {Request, Response} from 'express'
import { prisma } from '../database'
export default {
    async createMovie(request: Request , response: Response){
        try{
            const {title, sinopse, image} = request.body;
            const existingMovie = prisma.movie.findUnique({where: {image, title}});
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
            return response.status(400).json({
                error: true,
                message: "Ocorreu um erro ao cadastrar um filme",
                details: err.message
            })
        }
    }
}