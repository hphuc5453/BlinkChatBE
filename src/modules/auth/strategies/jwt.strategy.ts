import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, JwtFromRequestFunction, Strategy } from 'passport-jwt';
import { User } from "src/database/user.entity";
import { AuthService } from "../auth.service";
import { JwtPayload } from "../interface/jwt-payload.interface";

const extractJwtFromCookie: JwtFromRequestFunction = request => {
    return request.signedCookies['token']!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                extractJwtFromCookie,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.APP_SECRET,
            passReqToCallback: false
        })
    }

    async validate(payload: JwtPayload): Promise<User | null> {
        return await this.authService.verifyPayload(payload);
    }

}