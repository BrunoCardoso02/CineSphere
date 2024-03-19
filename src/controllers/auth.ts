import { Request, Response } from 'express'
import { prisma } from '../database';
import { hashSync, compareSync} from 'bcrypt'
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';

export default {
    async signUp (request: Request, response: Response){
        try{
            const {email, name, password} = request.body;
            const user = await prisma.user.findUnique({where: {email}});
            if(user){
                return response.status(400).json({
                    message: 'Esse Email já foi cadastrado'
                });
            };
            const userCreated = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashSync(password, 10)
                }
            });
            response.json({
                userCreated
            })
        } catch(err) {
            return response.status(500).json({
                error: true,
                message: "Não foi possível criar conta",
                details: err.message
            })
        }
    },
    async signIn(request: Request, response: Response) {
        try{
            const {email, password} = request.body;
            const user = await prisma.user.findFirst({where: {email}});
            if(!user){
                return response.status(400).json({
                    error: true,
                    message: 'Não há conta cadastrada com esse email!'
                });
            };
            if(!compareSync(password, user.password)){
                return response.status(400).json({
                    error: true,
                    message: "Senha Incorreta!"
                });
            };

            const token = jwt.sign({
                userId: user.id
            }, JWT_SECRET)
            
            return response.json({
                user,
                token
            })
        } catch(err){
            return response.status(500).json({
                error: true,
                message: "Ocorreu algum erro na listagem!",
                details: err.message
            })
        }
    }
}