import { instanceToInstance } from 'class-transformer';

import { IUserProfileDTO } from "../dtos/IUserProfileResponseDTO";
import { User } from "../infra/typeorm/entities/User";

export class UserProfileMap {
    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license,
        avatar_url
    }: User): IUserProfileDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
            avatar,
            driver_license,
            avatar_url
        });

        return user;
    }
}
