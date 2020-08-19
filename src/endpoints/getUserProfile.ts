import { Request, Response} from "express";
import {Authenticator} from "../src/services/Authenticator";
import {UserDatabase} from "../data/UserDatabase";
import {BaseDatabase} from "../data/BaseDatabase";

export const getUserProfile = async (req: Request, res: Response) => {
  try {

    const token = req.headers.authorization as string;

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserById(authenticationData.id);

    res.status(200).send({
      userName: user.name,
      userEmail: user.email,
      userId: user.id
    })

  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  } finally {
    await BaseDatabase.destroyConnection();
  }
};