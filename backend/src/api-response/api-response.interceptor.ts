import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        return this.successHandler(data);
      }),
    );
  }

  successHandler(data: any) {
    return {
      status: 'success',
      content: data,
      timestamp: this.getCurrentTimeStamp(),
    };
  }

  getCurrentTimeStamp() {
    const padZero = (num) => (num < 10 ? '0' + num : num);
    const now = new Date();
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1); // Months are zero-based
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
