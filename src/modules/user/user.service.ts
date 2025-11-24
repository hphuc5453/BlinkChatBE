import { Injectable } from "@nestjs/common";
import { User } from "src/database/user.entity";

@Injectable()
export class UserService {
    private readonly users = [
        {
            id: 1,
            email: 'test@gmail.com',
            password: '12345'
        }
    ]

    async findByEmail(email: String): Promise<User | undefined> {
        return this.users.find(user => user.email == email);
    }
}