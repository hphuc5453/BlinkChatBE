import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Response } from 'express';
import { User } from 'src/modules/user/user.schema';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup_dto';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SignInInterface } from './interface/signin.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
}
