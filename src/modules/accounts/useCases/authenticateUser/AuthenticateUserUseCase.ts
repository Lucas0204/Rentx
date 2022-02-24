import { compare } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/containers/providers/IDateProvider';
import { User } from '@modules/accounts/infra/typeorm/entities/User';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
    refresh_token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        
        @inject('DateProvider')
        private dateProvider: IDateProvider
    ) {}
    
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Email or Password incorrect!');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError('Email or Password incorrect!');
        }

        const token = sign({}, auth.token_secret, {
            subject: user.id,
            expiresIn: auth.token_expires
        })

        const refresh_token = await this.generateRefreshToken(user);
        
        return {
            user: { 
                name: user.name, 
                email: user.email 
            },
            token,
            refresh_token
        };
    }

    private async generateRefreshToken({ email, id }: User): Promise<string> {
        const refresh_token = sign({ 
            email
        }, 
        auth.refresh_token_secret, 
        {
            subject: id,
            expiresIn: auth.refresh_token_expires
        });

        const daysToExpire = parseInt(auth.refresh_token_expires_days);

        const expires_date = this.dateProvider.addDays(daysToExpire);

        await this.usersTokenRepository.create({
            user_id: id,
            refresh_token,
            expires_date
        })

        return refresh_token;
    }
}

export { AuthenticateUserUseCase };
