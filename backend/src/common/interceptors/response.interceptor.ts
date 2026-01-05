import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const req = context.switchToHttp().getRequest();

    return next.handle().pipe(
      map((data) => ({
        success: true,
        code: 'SUCCESS',
        message: 'Request processed successfully',
        data,
        meta: {
          timestamp: new Date().toISOString(),
          path: req.url,
          requestId: req.headers['x-request-id'],
        },
      })),
    );
  }
}
