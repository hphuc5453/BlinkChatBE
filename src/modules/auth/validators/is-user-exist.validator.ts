import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AUTH_MESSAGES } from "src/commons/strings";
import { User } from "src/database/user.entity";
import { Repository } from "typeorm";

@ValidatorConstraint({ name: 'isUserExist', async: true })
@Injectable()
export class IsUserExist implements ValidatorConstraintInterface {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) { }

    async validate(email: string): Promise<boolean> {
        const user = await this.userRepository.findOneBy({ email });
        return user === null || user === undefined
    }

    defaultMessage(): string {
        return AUTH_MESSAGES.EMAIL_EXISTED;
    }

}