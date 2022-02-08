import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUpdateAvatarDTO } from '../../dtos/IUpdateAvatarDTO';
import { Repository, getRepository } from 'typeorm';

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

    async updateAvatar({ id, avatar }: IUpdateAvatarDTO): Promise<void> {
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
