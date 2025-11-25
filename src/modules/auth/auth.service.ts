import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { SignUpDto } from './dto/signup_dto';
import { SignInInterface } from './interface/signin.interface';
import { User } from 'src/database/user.entity';
import { AUTH_MESSAGES } from 'src/commons/strings';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, pass: string): Promise<User | null> {
        return this.validateUser(email, pass);
    }

    async signUp(signUpDto: SignUpDto): Promise<SignInInterface> {
        const user = await this.userService.create(signUpDto);
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            status: user.status,
            token: undefined
        };
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        console.log("LOGIN INPUT:", email, password);

        let user: (User | null)
        try {
            user = await this.userService.findOne({ where: { email } });

        } catch (err) {
            throw new UnauthorizedException(
                AUTH_MESSAGES.USER_NOT_FOUND
            )
        }

        if (!await user?.checkPassword(password)) {
            throw new UnauthorizedException(
                AUTH_MESSAGES.PASSWORD_INCORRECT
            )
        }

        return user;
    }

    async verifyPayload(payload: JwtPayload): Promise<User | null> {
        let user: (User | null)
        try {
            user = await this.userService.findOne({ where: { email: payload.sub } });
        } catch (err) {
            throw new UnauthorizedException(
                AUTH_MESSAGES.USER_NOT_FOUND
            )
        }
        return user;
    }

    signToken(user: User): string {
        const payload = {
            sub: user.email,
        };

        return this.jwtService.sign(payload);
    }
}
