import { Request, Response } from "express";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { BaseDatabase } from "../data/BaseDatabase";

export const createRefreshToken = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.body.refreshToken;
    const device = req.body.device;

    const authenticator = new Authenticator();
    const refreshTokenData = authenticator.getData(refreshToken);
    if (refreshTokenData.device !== device) {
      throw new Error("Refresh token has no device");
    }

    const userDataBase = new UserDatabase();
    const user = await userDataBase.getUserById(refreshTokenData.id);

    const accessToken = authenticator.generateToken(
      {
        id: user.id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_EXPIRES_IN as string
    );

    res.status(200).send({
      message: "Refresh token sucessfull",
      accessToken,
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await BaseDatabase.destroyConnection();
  }
};
