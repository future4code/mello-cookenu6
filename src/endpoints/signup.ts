import { Request, Response} from "express";
import {IdGenerator} from "../src/services/IdGenerator";
import {HashManager} from "../src/services/HashManager";
import {UserDatabase} from "../data/UserDatabase";
import {Authenticator} from "../src/services/Authenticator";
import {BaseDatabase} from "../data/BaseDatabase";

export const signup = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    if(!name || !email || !password) {
      throw new Error('Insert all required information');
    }

    if(email.indexOf('@') === -1) {
      throw new Error('Invalid email');
    }

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const hashManager = new HashManager();
    const hashPassword = await hashManager.hash(password);

    const userDatabase = new UserDatabase();
    await userDatabase.createUser(
      id,
      name,
      email,
      hashPassword
    );

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({id})

    res.status(200).send({
      message: 'User created successfully',
      token
    })

  } catch (e) {
    res.status(400).send({
      message: e.message
    })
  } finally {
    await BaseDatabase.destroyConnection();
  }
};