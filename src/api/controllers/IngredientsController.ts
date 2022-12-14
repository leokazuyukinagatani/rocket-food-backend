import { Request, Response } from "express";
import {
  IIngredient,
  IngredientRepository,
} from "../repositories/ingredients/IngredientRepository";
import { IngredientCreateService } from "../services/ingredients/IngredientCreateService";
import { IngredientDeleteService } from "../services/ingredients/IngredientDeleteService";
import { IngredientIndexService } from "../services/ingredients/IngredientIndexService";
import { IngredientShowService } from "../services/ingredients/IngredientShowService";
import { IngredientUpdateService } from "../services/ingredients/IngredientUpdate";
import { AppError } from "../utils/AppError";

export class IngredientsController {
  async create(request: Request, response: Response) {
    const { name, description } = request.body;

    const ingredientRepository = new IngredientRepository();
    const ingredientCreateService = new IngredientCreateService(
      ingredientRepository
    );

    const ingredientResult = await ingredientCreateService.execute({
      name,
      description,
    });

    if (ingredientResult instanceof AppError) {
      return response.status(400).json(ingredientResult.message);
    }

    return response.status(201).json(ingredientResult);
  }

  async delete(request: Request, response: Response) {
    const { ingredient_id } = request.body;
    const ingredientRepository = new IngredientRepository();
    const ingredientDeleteService = new IngredientDeleteService(
      ingredientRepository
    );
    const ingredientResult = await ingredientDeleteService.execute(
      ingredient_id
    );
    if (ingredientResult instanceof AppError) {
      return response.status(400).json(ingredientResult.message);
    }
    return response.status(200).json(ingredientResult);
  }

  async show(request: Request, response: Response) {
    const { ingredient_id } = request.body;
    const ingredientRepository = new IngredientRepository();
    const ingredientShowService = new IngredientShowService(
      ingredientRepository
    );

    const ingredientResult = await ingredientShowService.execute(ingredient_id);

    if (ingredientResult instanceof AppError) {
      return response.status(400).json(ingredientResult.message);
    }
    return response.status(200).json(ingredientResult);
  }

  async index(request: Request, response: Response) {
    const ingredientRepository = new IngredientRepository();
    const ingredientIndexService = new IngredientIndexService(
      ingredientRepository
    );

    const ingredientsResult = await ingredientIndexService.execute();

    return response.status(200).json(ingredientsResult);
  }

  async update(request: Request, response: Response) {
    const { id, name, description }: IIngredient = request.body;

    const ingredientRepository = new IngredientRepository();
    const ingredientUpdateService = new IngredientUpdateService(
      ingredientRepository
    );

    const updatedIngredient = await ingredientUpdateService.execute({
      id,
      name,
      description,
    });

    if (updatedIngredient instanceof AppError) {
      return response.status(400).json(updatedIngredient.message);
    }
    return response.status(200).json(updatedIngredient);
  }
}
