import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/database/user.entity";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

    async findOne(where: FindOneOptions<User>): Promise<User | null> {
        const user = this.userRepository.findOne(where);
        if (!user) {
            throw new NotFoundException(`There isn't any user with identifier: ${where}`)
        }
        return user;
    }

    async create(data: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(data);
        return this.userRepository.save(newUser);
    }
}