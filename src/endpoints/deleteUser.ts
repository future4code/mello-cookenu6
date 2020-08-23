import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { ForbiddenError } from "../errors/ForbiddenError";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const userDatabase = new UserDatabase();

    if (authenticationData.id !== id && authenticationData.role !== "admin")
      throw new ForbiddenError();

    await userDatabase.deleteUser(id);

    res.status(200).send({
      message: "User deleted!",
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
