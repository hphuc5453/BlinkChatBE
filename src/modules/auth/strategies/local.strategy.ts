import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/database/user.entity";
import { AuthService } from "../auth.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passReqToCallback: false,
        })
    }

    validate(email: string, password: string): Promise<User | null> {
        return this.authService.validateUser(email, password);
    }
    
}