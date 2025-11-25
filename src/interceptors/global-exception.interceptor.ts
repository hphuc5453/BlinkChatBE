import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { GLOBAL_EXCEPTION } from "src/commons/strings";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : 500;

        let errorResponse =
            exception instanceof HttpException
                ? exception.getResponse()
                : GLOBAL_EXCEPTION.INTERAL_SERVER_ERROR;

        let message = errorResponse['message'] || errorResponse;

        if (Array.isArray(message)) {
            message = message.join(', ');
        }

        return response.status(status).json({
            success: false,
            message,
            data: null,
        });
    }

}