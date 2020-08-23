import { CustomError } from "./base/CustomError";

export class InvalidPasswordError extends CustomError {
  public message = "Password must be at least 6 characters long";
  constructor(...params: any) {
    super(400, ...params);
  }
}
