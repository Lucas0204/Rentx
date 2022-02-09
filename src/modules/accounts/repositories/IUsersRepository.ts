import { User } from '../entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateAvatarDTO } from '../dtos/IUpdateAvatarDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    updateUserAvatar({ id, avatar }: IUpdateAvatarDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
}

export { IUsersRepository };
