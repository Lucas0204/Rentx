import { inject, injectable } from "tsyringe";
import { resolve } from 'path';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from '../../../../utils/file';

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);        

        if (user.avatar) {
            const path = resolve(__dirname, '..', '..', '..', '..', '..', 'tmp', 'avatar');
            await deleteFile(path + user.avatar);
        }

        await this.usersRepository.updateAvatar({
            id: user_id,
            avatar: avatar_file
        });
    }
}

export { UpdateUserAvatarUseCase };
