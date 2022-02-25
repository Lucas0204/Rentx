import { User } from '../infra/typeorm/entities/User';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { IUpdateAvatarDTO } from '../dtos/IUpdateAvatarDTO';
import { IResetPasswordDTO } from '../dtos/IResetPasswordDTO';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    updateUserAvatar({ id, avatar }: IUpdateAvatarDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    resetPassword(data: IResetPasswordDTO): Promise<void>;
}

export { IUsersRepository };
