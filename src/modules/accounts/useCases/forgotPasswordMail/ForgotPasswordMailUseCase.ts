import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { AppError } from '@shared/errors/AppError';
import { IMailProvider } from '@shared/containers/providers/MailProvider/IMailProvider';

@injectable()
class ForgotPasswordMailUseCase {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        
        @inject('DateProvider')
        private dateProvider: IDateProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider
    ) {}
    
    async execute(email: string) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User does not exist!');
        }

        const token = uuidv4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokenRepository.create({
            user_id: user.id,
            refresh_token: token,
            expires_date
        });

        const emailTemplateFilePath = path.resolve(
            __dirname, 
            '..', '..', 
            'views', 
            'email', 
            'forgotPassword.hbs'
        );

        const template_variables = {
            name: user.name,
            link: process.env.RESET_PASSWORD_URL
        }

        await this.mailProvider.sendMail({
            to: user.email,
            subject: 'Recuperação de senha',
            template_variables,
            path: emailTemplateFilePath
        });
    }
}

export { ForgotPasswordMailUseCase };
