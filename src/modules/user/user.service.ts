import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

    async createUser(email: string, password: string, name: string) {
        const newUser = this.userRepository.create({
            email,
            password,
            name
        });
        return this.userRepository.save(newUser);
    }
}