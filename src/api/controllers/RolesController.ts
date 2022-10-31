import { Request, Response } from "express";
import { RoleRepository } from "../repositories/roles/RoleRepository";
import { RoleCreateService } from "../services/roles/RoleCreateService";

export class RolesController {
  async create(request: Request, response:Response) {
    const { name, description, user } = request.body

    const userId = user.id
    const roleRepository = new RoleRepository()
    const roleCreateService = new RoleCreateService(roleRepository) 

    const result = await roleCreateService.execute({name, description, userId})

    if(result instanceof Error) {
      return response.status(400).json(result.message)
    }

    return response.status(201).json(result)
  } 
}