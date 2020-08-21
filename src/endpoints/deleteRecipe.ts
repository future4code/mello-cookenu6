import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const deleteRecipe = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const recipeDatabase = new RecipeDatabase();

    const isOwner: boolean = await recipeDatabase.checkRecipeOwnership(
      id,
      authenticationData.id
    );

    if (!isOwner && authenticationData.role !== "admin")
      throw "Permission denied";

    await recipeDatabase.deleteRecipe(id);

    res.status(200).send({
      message: "Recipe deleted!",
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
