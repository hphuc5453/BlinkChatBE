import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequest } from 'src/modules/auth/dto/signin_dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInRequest: SignInRequest) {
        return this.authService.signIn(signInRequest.email, signInRequest.password);
    }
}
