import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { UserDatabase } from "../data/UserDatabase";
import { BaseDatabase } from "../data/BaseDatabase";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization as string;
    const userId = req.params.id;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserById(userId);

    res.status(200).send(user);
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
