import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()

    readonly email: string;
    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}