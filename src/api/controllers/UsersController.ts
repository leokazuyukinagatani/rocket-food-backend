import { Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { UserRepository } from '../repositories/users/UserRepository'
import { UserCreateService } from '../services/users/UsersCreateService'
class UsersController {
  async create( request:Request, response:Response){
    const { name, email, password, passwordConfirm } = request.body

    const userRepository = new UserRepository()
    const userCreateService = new UserCreateService(userRepository)

    const { id } = await userCreateService.execute({ name, email, password, passwordConfirm })

    return response.status(201).json({ id })
  }

}

export {
  UsersController
}