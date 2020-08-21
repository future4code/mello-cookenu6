import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export const getRecipe = async (req: Request, res: Response) => {
  try {
    const recipeDataBase = new RecipeDatabase();
    const recipe = await recipeDataBase.getRecipeById(req.params.id);

    res.status(200).send({
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      createAt: (recipe.creation_date as Date)
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/"),
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
