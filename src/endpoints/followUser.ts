import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FollowDatabase } from "../data/FollowDatabase";
import { UserDatabase } from "../data/UserDatabase";

export const followUser = async (req: Request, res: Response) => {
  try {
    const userToFollowId = req.body.userToFollowId;
    const token = req.headers.authorization as string;

    if (!userToFollowId) {
      throw new Error("Verifique se os campos estão completos");
    }

    const userDatabase = new UserDatabase();
    const checkId = await userDatabase.userCheck(userToFollowId);

    if (!checkId) {
      throw new Error("id do usuário que se deseja seguir não encontrado");
    }

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const followDatabase = new FollowDatabase();
    await followDatabase.followUser(authenticationData.id, userToFollowId);

    res.status(200).send({
      message: "Seguindo usuário",
    });
  } catch (e) {
    res.status(400).send({
      message: e.sqlMessage || e.message,
    });
  } finally {
    await Promise.all([
      FollowDatabase.destroyConnection(),
      UserDatabase.destroyConnection(),
    ]);
  }
};
