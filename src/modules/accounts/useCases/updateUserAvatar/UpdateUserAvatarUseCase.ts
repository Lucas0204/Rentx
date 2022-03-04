import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IStorageProvider } from "@shared/containers/providers/StorageProvider/IStorageProvider";

interface IRequest {
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}
    
    async execute({ user_id, avatar_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);        

        if (user.avatar) {
            await this.storageProvider.delete(user.avatar, 'avatar');
        }

        await this.storageProvider.save(avatar_file, 'avatar');

        await this.usersRepository.updateUserAvatar({
            id: user_id,
            avatar: avatar_file
        });
    }
}

export { UpdateUserAvatarUseCase };
