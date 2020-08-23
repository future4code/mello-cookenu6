import { CustomError } from "./base/CustomError";

export class GenericError extends CustomError {
  constructor(...params: any) {
    super(400, ...params);
  }
}
