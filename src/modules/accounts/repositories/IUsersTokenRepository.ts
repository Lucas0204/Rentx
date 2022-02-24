import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUsersTokenRepository {
    create(data: ICreateUserTokenDTO): Promise<UserToken>;
}
