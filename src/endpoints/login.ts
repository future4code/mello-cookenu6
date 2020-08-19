import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Hash } from "crypto";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserByEmail(email);

    const hashManager = new HashManager();
    const isPasswordCorrect = await hashManager.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("User or password incorrect");
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id: user.id });

    res.status(200).send({
      message: "User logged successfully",
      token,
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
