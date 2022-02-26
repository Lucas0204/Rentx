import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IFindUserTokenDTO } from "@modules/accounts/dtos/IFindUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokenRepository } from "../IUsersTokenRepository";


class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
    private usersTokens: UserToken[];
    
    constructor() {
        this.usersTokens = [];
    }
    
    async create({
        user_id,
        refresh_token,
        expires_date
    }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();

        Object.assign(userToken, {
            user_id,
            refresh_token,
            expires_date
        });

        this.usersTokens.push(userToken);

        return userToken;
    }

    async findOne({
        refresh_token,
        user_id
    }: IFindUserTokenDTO): Promise<UserToken> {
        const userToken = this.usersTokens.find(userToken => {
            if (user_id) {
                return userToken.refresh_token === refresh_token 
                    && userToken.user_id === user_id;
            }

            return userToken.refresh_token === refresh_token;
        });

        return userToken;
    }

    async delete(token_id: string): Promise<void> {
        const newUsersTokens = this.usersTokens.filter(userToken => userToken.id !== token_id);
        this.usersTokens = newUsersTokens;
    }
}

export { UsersTokenRepositoryInMemory };
