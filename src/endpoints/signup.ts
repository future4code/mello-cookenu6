import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";
import { InvalidBodyError } from "../errors/InvalidBodyError";
import { InvalidEmailError } from "../errors/InvalidEmailError";
import { InvalidPasswordError } from "../errors/InvalidPasswordError";

export const signup = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const device = req.body.device;

    if (!name || !email || !password) {
      throw new InvalidBodyError();
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidEmailError();
    }

    if (password.length < 6) {
      throw new InvalidPasswordError();
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(id, name, email, hashPassword, role);

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken(
      { id, role },
      process.env.ACCESS_TOKEN_EXPIRES_IN as string
    );

    const refreshToken = authenticator.generateToken(
      {
        id,
        device,
      },
      process.env.REFRESH_TOKEN_EXPIRES_IN as string
    );

    const refreshTokenDatabase = new RefreshTokenDatabase();
    await refreshTokenDatabase.createRefreshToken(
      refreshToken,
      device,
      true,
      id
    );

    res.status(200).send({
      message: "User created successfully",
      accessToken,
    });
  } catch (e) {
    res.status(e.statusCode || 400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
