import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateAvatarDTO } from "../../dtos/IUpdateAvatarDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    async create({ name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license,
            avatar
        });

        this.users.push(user);
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find(user => user.id === id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user => user.email === email);
        return user;
    }

    async updateUserAvatar({ id, avatar }: IUpdateAvatarDTO): Promise<void> {
        const user = this.users.find(user => user.id === id);
        user.avatar = avatar;
    }
}

export { UsersRepositoryInMemory };
