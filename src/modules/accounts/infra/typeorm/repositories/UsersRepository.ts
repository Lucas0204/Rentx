import { Repository, getRepository } from 'typeorm';
import { User } from '../entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUpdateAvatarDTO } from '@modules/accounts/dtos/IUpdateAvatarDTO';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password, driver_license, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license,
            avatar
        });

        await this.repository.save(user);
    }

    async updateUserAvatar({ id, avatar }: IUpdateAvatarDTO): Promise<void> {
        await this.repository.update({ id }, { avatar });
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ email });
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository };
