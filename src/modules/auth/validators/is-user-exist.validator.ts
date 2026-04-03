import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AUTH_MESSAGES } from "src/commons/strings";
import { User } from "src/modules/user/user.schema";
import { Model } from "mongoose";

@ValidatorConstraint({ name: 'isUserExist', async: true })
@Injectable()
export class IsUserExist implements ValidatorConstraintInterface {

    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>
    ) { }

    async validate(email: string): Promise<boolean> {
        const user = await this.userModel.findOne({ email });
        return user === null || user === undefined
    }

    defaultMessage(): string {
        return AUTH_MESSAGES.EMAIL_EXISTED;
    }

}