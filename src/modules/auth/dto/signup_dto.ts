import { IsDefined, IsEmail, IsNotEmpty, IsString, MinLength, Validate } from "class-validator";
import { IsUserExist } from "../validators/is-user-exist.validator";

export class SignUpDto {
    @IsDefined()
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @Validate(IsUserExist)
    readonly email: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password: string;

    @IsDefined()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
}