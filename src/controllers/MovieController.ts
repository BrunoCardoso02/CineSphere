import { Request, Response } from 'express';
import { prisma } from '../database';

interface Movie {
    title: string;
    sinopse: string;
    image: string;
}

export default {
    async createMovie(request: Request , response: Response) {
        try {
            const { title, sinopse, image } = request.body as Movie;
            const existingMovie = await prisma.movie.findUnique({
                where: {
                    image,
                    title
                }
            });
            
            if (existingMovie) {
                response.status(400).json({
                    error: true,
                    message: 'Este filme já está cadastrado'
                });
                return;
            }

            const movieCreated = await prisma.movie.create({
                data: {
                    title,
                    sinopse,
                    image
                }
            });

            response.status(201).json({
                message: 'Filme cadastrado!!!',
                movieCreated
            });
        } catch (err) {
            response.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao cadastrar um filme',
                details: err.message
            });
        }
    },

    async getMovies(request: Request, response: Response) {
        try {
            const movies = await prisma.movie.findMany();
            if (movies.length <= 0) {
                response.status(404).json({
                    message: 'Não há filmes cadastrados',
                });
                return;
            }
            response.json({
                movies
            });
        } catch (err) {
            response.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao buscar os filmes',
                details: err.message
            });
        }
    },

    async deleteMovie(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const movieDeleted = await prisma.movie.delete({ where: { id: Number(id) } });
            if (!movieDeleted) {
                response.status(404).json({
                    message: 'Não há nenhum filme com esse id'
                });
                return;
            }
            response.json({
                message: 'Filme deletado com sucesso!',
                movieDeleted
            });
        } catch (err) {
            response.status(500).json({
                error: true,
                message: 'Ocorreu um erro ao deletar o filme',
                details: err.message
            });
        }
    }
};
