import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../database/user.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) { }

    async signIn(email: String, pass: String): Promise<{access_token: string}> {
        const user = await this.userService.findByEmail(email);
        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }
        const payload = {sub: user.id, email: user.email}
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return {
            access_token: await this.jwtService.signAsync(payload)
        };
    }
}
