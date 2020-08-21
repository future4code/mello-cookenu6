import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { FollowDatabase } from "../data/FollowDatabase";
import { UserDatabase } from "../data/UserDatabase";

export const unfollowUser = async (req: Request, res: Response) => {
  try {
    const userToUnfollowId = req.body.userToUnfollowId;
    const token = req.headers.authorization as string;

    if (!userToUnfollowId) {
      throw new Error("Verifique se os campos estão completos");
    }

    const userDatabase = new UserDatabase();
    const checkId = await userDatabase.userCheck(userToUnfollowId);

    if (!checkId) {
      throw new Error(
        "id do usuário que se deseja deixar de seguir não encontrado"
      );
    }

    const authenticator = new Authenticator();
    const authenticationData = authenticator.getData(token);

    const followDatabase = new FollowDatabase();
    await followDatabase.unfollowUser(authenticationData.id, userToUnfollowId);

    res.status(200).send({
      message: "Deixou de seguir o usuário com sucesso",
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
