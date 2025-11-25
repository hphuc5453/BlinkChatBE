import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/database/user.entity";
import { IsUserExist } from "../auth/validators/is-user-exist.validator";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, IsUserExist],
    exports: [UserService]
})

export class UserModule {}