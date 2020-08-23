import { CustomError } from "./base/CustomError";

export class NotFoundError extends CustomError {
  constructor(...params: any) {
    super(400, ...params);
  }
}
