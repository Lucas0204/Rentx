import { ICreateUserTokenDTO } from '../dtos/ICreateUserTokenDTO';
import { IFindUserTokenDTO } from '../dtos/IFindUserTokenDTO';
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface IUsersTokenRepository {
    create(data: ICreateUserTokenDTO): Promise<UserToken>;
    findOne(data: IFindUserTokenDTO): Promise<UserToken>;
    delete(token_id: string): Promise<void>;
}
