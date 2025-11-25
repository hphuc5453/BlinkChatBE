import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AUTH_MESSAGES } from 'src/commons/strings';

export interface Response<T> {
    data: T;
}

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
{
    intercept(
        ctx: ExecutionContext,
        next: CallHandler,
    ): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                let message = AUTH_MESSAGES.SUCCESS;
                if (
                    data?.message &&
                    data?.message != '' &&
                    typeof data.message === 'string'
                ) {
                    message = data.message;
                    data = data.data;
                }

                return {
                    data,
                    message,
                    statusCode: HttpStatus.OK,
                };
            }),
        );
    }
}
