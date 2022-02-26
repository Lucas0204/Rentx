import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IResetPasswordDTO } from "@modules/accounts/dtos/IResetPasswordDTO";
import { IUpdateAvatarDTO } from "@modules/accounts/dtos/IUpdateAvatarDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
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

    async resetPassword({ user_id, password }: IResetPasswordDTO): Promise<void> {
        const userIndex = this.users.findIndex(user => user.id === user_id);
        this.users[userIndex].password = password;
    }
}

export { UsersRepositoryInMemory };
