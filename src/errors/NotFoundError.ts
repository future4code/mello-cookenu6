import { CustomError } from "./base/CustomError";

export class NotFoundError extends CustomError {
  public message = "Resource not found";
  constructor(...params: any) {
    super(404, ...params);
  }
}
