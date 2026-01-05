import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExceptionResponse } from '../interfaces/exception-response.interface';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let exceptionResponse: ExceptionResponse = {};

    if (exception instanceof HttpException) {
      const res = exception.getResponse();

      if (typeof res === 'string') {
        exceptionResponse.message = res;
      } else {
        exceptionResponse = res as ExceptionResponse;
      }
    }

    response.status(status).json({
      success: false,
      code: exceptionResponse.code || 'ERROR',
      message: exceptionResponse.message || 'Internal server error',
      errors: exceptionResponse.errors,
      meta: {
        timestamp: new Date().toISOString(),
        path: request.url,
        requestId: request.headers['x-request-id'],
      },
    });
  }
}
