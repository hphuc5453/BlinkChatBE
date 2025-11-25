import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/user.service';
import { SignUpDto } from './dto/signup_dto';
import { SignInInterface } from './interface/signin.interface';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: string, pass: String): Promise<{ access_token: string }> {
        const user = await this.userService.findOne({ where: { email } });
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, email: user.email }
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
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
}
