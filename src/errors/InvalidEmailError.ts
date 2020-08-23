import { CustomError } from "./base/CustomError";

export class InvalidEmailError extends CustomError {
  public message = "Invalid email";
  constructor(...params: any) {
    super(400, ...params);
  }
}
