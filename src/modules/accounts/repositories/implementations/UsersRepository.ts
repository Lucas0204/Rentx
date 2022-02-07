import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { Repository, getRepository } from 'typeorm';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.repository.findOne({ email });
        return user;
    }
}

export { UsersRepository };
