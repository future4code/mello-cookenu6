import { CustomError } from "./base/CustomError";

export class InvalidEmailError extends CustomError {
  constructor(...params: any) {
    super(400, ...params);
  }
}
