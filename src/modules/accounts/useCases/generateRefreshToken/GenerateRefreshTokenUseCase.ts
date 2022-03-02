import { inject, injectable } from "tsyringe";
import { sign, verify } from 'jsonwebtoken';

import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import auth from "@config/auth";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";

interface IPayload {
    sub: string;
    email: string;
}

interface IGenerateToken {
    email: string;
    user_id: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class GenerateRefreshTokenUseCase {
    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject('DateProvider')
        private dateProvider: IDateProvider
    ) {}
    
    async execute(token: string): Promise<ITokenResponse> {
        const { sub: user_id, email } = verify(token, auth.refresh_token.secret) as IPayload;

        const userToken = await this.usersTokenRepository.findOne({
            user_id,
            refresh_token: token
        });

        if (!userToken) {
            throw new AppError('Token does not exist!');
        }

        await this.usersTokenRepository.delete(userToken.id);

        const refresh_token = await this.generateRefreshToken({
            email,
            user_id
        });

        const newToken = sign({}, auth.jwt.secret, {
            subject: user_id,
            expiresIn: auth.jwt.expires
        });

        return {
            token: newToken,
            refresh_token
        };
    }

    private async generateRefreshToken({ email, user_id }: IGenerateToken): Promise<string> {
        const refresh_token = sign({
            email
        }, 
        auth.refresh_token.secret, 
        {
            subject: user_id,
            expiresIn: auth.refresh_token.expires
        });

        const daysToExpire = parseInt(auth.refresh_token.expires_days);
        const expires_date = this.dateProvider.addDays(daysToExpire);
        
        await this.usersTokenRepository.create({
            user_id,
            refresh_token,
            expires_date
        });

        return refresh_token;
    }
}

export { GenerateRefreshTokenUseCase };
