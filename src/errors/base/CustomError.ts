export abstract class CustomError extends Error {
  constructor(public statusCode: number, ...params: any) {
    super(...params);
  }
}
