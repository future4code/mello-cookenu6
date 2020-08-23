import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FollowDatabase } from "../data/FollowDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export const getFeed = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const followDataBase = new FollowDatabase();
    const recipes = await followDataBase.getFeed(authenticationData.id);

    for (let recipe of recipes) {
      recipe.createdAt = (recipe.createdAt as Date)
        .toISOString()
        .split("T")[0]
        .split("-")
        .reverse()
        .join("/");
    }

    res.status(200).send({
      recipes,
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
