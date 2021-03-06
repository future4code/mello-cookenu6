import * as jwt from "jsonwebtoken";

export class Authenticator {
  public generateToken(data: AuthenticationData, expiresIn: string): string {
    return jwt.sign(data, process.env.JWT_KEY as string, {
      expiresIn,
    });
  }

  public getData(token: string): AuthenticationData {
    const data = jwt.verify(token, process.env.JWT_KEY as string) as any;
    return data;
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
  device?: string;
}
