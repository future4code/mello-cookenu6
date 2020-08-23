import { CustomError } from "./base/CustomError";

export class InvalidBodyError extends CustomError {
  public message = "Invalid or missing information in body";
  constructor(...params: any) {
    super(400, ...params);
  }
}
