import { Request, Response } from "express";
import { prisma } from "../database";

interface User {
  name: string,
  email: string,
  password: string
}

export default {
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
