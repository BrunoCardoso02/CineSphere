import { Request, Response } from "express";
import { prisma } from "../database";

export default {
  async createUser(request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;
      const userExisting = await prisma.user.findUnique({ where: email });
      if (userExisting) {
        return response.json({
          error: true,
          message: 'Email já cadastrado!'
        });
      };
      const userCreated = await prisma.user.create({ 
        data: {
          name,
          email,
          password
        }
       })

       return response.json({
        error: false,
        message: 'Usuário Cadastrado!!!'
       })
    } catch (err) {
      return response.json({
        message: err
      })
    }
  }
}