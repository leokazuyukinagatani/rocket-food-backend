import { IngredientRepository } from "../../repositories/ingredients/IngredientRepository";
import { AppError } from "../../utils/AppError";

export class IngredientShowService {
  repository: IngredientRepository;

  constructor(repository: IngredientRepository) {
    this.repository = repository;
  }

  async execute(ingredient_id: String) {
    if (!ingredient_id) {
      throw new AppError("ingredient id is required.");
    }

    if (typeof ingredient_id != "string" || ingredient_id === " ") {
      throw new AppError("ingredient id should be a String.");
    }

    const ingredient = await this.repository.showById(ingredient_id);

    if (!ingredient) {
      throw new AppError("Produto não encontrado.");
    }

    return ingredient;
  }
}
