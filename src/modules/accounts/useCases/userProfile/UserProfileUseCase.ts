import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { UserProfileMap } from '@modules/accounts/mappers/UserProfileMap';
import { IUserProfileDTO } from "@modules/accounts/dtos/IUserProfileResponseDTO";

@injectable()
class UserProfileUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    
    async execute(user_id: string): Promise<IUserProfileDTO> {
        const user = await this.usersRepository.findById(user_id);
        return UserProfileMap.toDTO(user);
    }
}

export { UserProfileUseCase };
