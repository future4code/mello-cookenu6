import { CustomError } from "./base/CustomError";

export class UnauthorizedError extends CustomError {
  public message = "User is not logged in";
  constructor(...params: any) {
    super(401, ...params);
  }
}
