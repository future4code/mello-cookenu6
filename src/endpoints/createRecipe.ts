import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { RecipeDatabase } from "../data/RecipeDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const createRecipe = async (req: Request, res: Response) => {
  try {
    const title = req.body.title;
    const description = req.body.description;
    const token = req.headers.authorization as string;

    if (!title || !description) {
      throw new Error("Insert all required information");
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const recipeDatabase = new RecipeDatabase();
    await recipeDatabase.createRecipe(
      id,
      title,
      description,
      authenticationData.id
    );

    res.status(200).send({
      message: "Recipe created!",
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
