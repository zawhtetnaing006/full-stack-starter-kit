import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(ApiExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.error(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      status === HttpStatus.INTERNAL_SERVER_ERROR
        ? 'Error: something went wrong!'
        : exception.message;

    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exception);
    }

    response.status(status).json({
      status: 'error',
      error: {
        code: status,
        message,
        detail: exception?.response?.message,
      },
      timestamp: this.getCurrentTimeStamp(),
    });
  }

  getCurrentTimeStamp() {
    const padZero = (num) => (num < 10 ? '0' + num : num);
    const now = new Date();
    const year = now.getFullYear();
    const month = padZero(now.getMonth() + 1);
    const day = padZero(now.getDate());
    const hours = padZero(now.getHours());
    const minutes = padZero(now.getMinutes());
    const seconds = padZero(now.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
}
