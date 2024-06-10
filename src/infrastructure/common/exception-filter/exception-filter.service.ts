import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { LoggerService } from '../../logger/logger.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

interface IError {
  message: string;
  code_error: string;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : this.getStatus(exception);

    const message =
      exception instanceof HttpException
        ? (exception.getResponse() as IError)
        : this.getErrorMessage(exception);

    const responseData = {
      ...{
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
      ...message,
    };

    this.logMessage(request, message, status, exception);

    response.status(status).json(responseData);
  }

  private getStatus(exception: any): number {
    if (this.isDatabaseException(exception)) {
      return HttpStatus.BAD_REQUEST;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private isDatabaseException(exception: any): boolean {
    return exception instanceof PrismaClientKnownRequestError;
  }

  private getErrorMessage(exception: any): IError {
    if (this.isDatabaseException(exception)) {
      switch (exception.code) {
        case 'P2002':
          return {
            message: 'Database error: unique constraint failed',
            code_error: (exception as PrismaClientKnownRequestError).code,
          };
      }
    }
    return { message: (exception as Error).message, code_error: null };
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    const errorOrigin = this.extractErrorOrigin(exception.stack);

    if (status === 500 || status === 400) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${
          message.message ? message.message : null
        } origin=${errorOrigin}`,
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} code_error=${
          message.code_error ? message.code_error : null
        } message=${
          message.message ? message.message : null
        } origin=${errorOrigin}`,
      );
    }
  }

  private extractErrorOrigin(stack: string): string {
    const stackLines = stack.split('\n');
    if (stackLines.length > 1) {
      const relevantLine = stackLines[1].trim();
      return relevantLine;
    }
    return 'Unknown';
  }
}
