import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import type { Response } from 'express';
import { User } from 'src/database/user.entity';
import { AuthUser } from '../user/decorators/user.decorator';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup_dto';
import { JwtGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { SignInInterface } from './interface/signin.interface';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @UseGuards(LocalAuthGuard)
    @UseInterceptors(TokenInterceptor)
    async signIn(@AuthUser() user: User): Promise<SignInInterface> {
        const token = this.authService.signToken(user);
        return {
            id: user.id,
            email: user.email,
            status: user.status,
            name: user.name,
            token
        };
    }

    @Post('signup')
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(TokenInterceptor)
    async signUp(@Body() request: SignUpDto): Promise<SignInInterface> {
        return await this.authService.signUp(request);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtGuard)
    async logout(@Res({ passthrough: true }) response: Response): Promise<boolean> {

        response.setHeader('Authorization', '');
        response.clearCookie('token', {
            httpOnly: true,
            signed: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            path: '/'
        });
        return true;
    }
}
