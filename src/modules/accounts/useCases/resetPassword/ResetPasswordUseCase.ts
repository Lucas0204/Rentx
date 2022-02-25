import { inject, injectable } from 'tsyringe';
import { hash } from 'bcryptjs';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    refresh_token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {
    private dateNow: Date;

    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider
    ) {
        this.dateNow = this.dateProvider.dateNow();
    }
    
    async execute({ refresh_token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findOne({
            refresh_token
        });

        if (!userToken) {
            throw new AppError('Invalid token!', 401);
        }

        const { user_id, expires_date } = userToken;

        const tokenExpires = this.dateProvider.verifyIfExpires(
            expires_date, 
            this.dateNow    
        );

        if (tokenExpires) {
            throw new AppError('Token expired!');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.resetPassword({
            user_id,
            password: passwordHash
        });

        await this.usersTokenRepository.delete(userToken.id);
    }
}

export { ResetPasswordUseCase };
