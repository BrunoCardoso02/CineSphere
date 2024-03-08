import { Request, Response } from "express";
import { prisma } from "../database";

interface User {
  name: string,
  email: string,
  password: string
}

export default {
  async createUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body as User;
      const userExisting = await prisma.user.findUnique({ where: { email } });
      if (userExisting) {
        return response.status(400).json({
          error: true,
          message: 'Email já cadastrado!'
        });
      }
      const userCreated = await prisma.user.create({ 
        data: {
          name,
          email,
          password
        }
      });

      return response.status(201).json({
        message: 'Usuário Cadastrado!!!',
        userCreated
      });
    } catch (err) {
      return response.status(500).json({
        error: true,
        message: 'Erro ao cadastrar usuário',
        details: err.message
      });
    }
  },

  async getUser(request: Request, response: Response) { 
    try {
        const users = await prisma.user.findMany();
        if (!users) {
            return response.status(400).json({
                error: true,
                message: "Não há usuários cadastrados"
            });
        }

        return response.status(200).json({
            users
        });
    } catch (err) {
        return response.status(500).json({
            error: true,
            message: "Ocorreu algum erro na listagem!",
            details: err.message
        });
    }
  }
}
