import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";

class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create({
        user_id,
        refresh_token,
        expires_date
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            refresh_token,
            expires_date
        });

        return await this.repository.save(userToken);
    }
}

export { UsersTokenRepository };
