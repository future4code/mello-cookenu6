import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Hash } from "crypto";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";
import { RefreshTokenDatabase } from "../data/RefreshTokenDatabase";

export const login = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const device = req.body.device;

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
    const accessToken = authenticator.generateToken(
      {
        id: user.id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_EXPIRES_IN as string
    );

    const refreshToken = authenticator.generateToken(
      {
        id: user.id,
        device: device,
      },
      process.env.REFRESH_TOKEN_EXPIRES_IN as string
    );

    const refreshTokenDatabase = new RefreshTokenDatabase();
    await refreshTokenDatabase.createRefreshToken(
      refreshToken,
      device,
      true,
      user.id
    );

    res.status(200).send({
      message: "User logged successfully",
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
