import { Request, Response } from "express";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const editRecipe2 = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const token = req.headers.authorization as string;

    if (!title || !description) {
      throw new Error("Insert all required information");
    }

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const recipeDatabase = new RecipeDatabase();

    const isOwner: boolean = await recipeDatabase.checkRecipeOwnership(
      id,
      authenticationData.id
    );

    if (!isOwner) throw "Permission denied";

    await recipeDatabase.editRecipe2(id, title, description);

    res.status(200).send({
      message: "Recipe updated!",
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
