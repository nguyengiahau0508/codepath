import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(
    code: string,
    message: string,
    status: HttpStatus,
    errors?: any[],
  ) {
    super(
      {
        code,
        message,
        errors,
      },
      status,
    );
  }
}
