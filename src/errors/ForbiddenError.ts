import { CustomError } from "./base/CustomError";

export class ForbiddenError extends CustomError {
  public message = "User does not have permission to perform this action";
  constructor(...params: any) {
    super(403, ...params);
  }
}
