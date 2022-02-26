import { hash } from 'bcryptjs';

import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import { IDateProvider } from "@shared/containers/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "@shared/containers/providers/DateProvider/implementation/DayjsDateProvider";
import { IMailProvider } from "@shared/containers/providers/MailProvider/IMailProvider";
import { EtherealMailProvider } from "@shared/containers/providers/MailProvider/implementation/EtherealMailProvider";
import { ForgotPasswordMailUseCase } from "./ForgotPasswordMailUseCase";
import { AppError } from '@shared/errors/AppError';

let forgotPasswordMailUseCase: ForgotPasswordMailUseCase;
let usersRepositoryInMemory: IUsersRepository;
let usersTokenRepositoryInMemory: IUsersTokenRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe('Forgot password mail use case', () => {
    beforeEach(() => {
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new EtherealMailProvider();

        forgotPasswordMailUseCase = new ForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    })

    it('should be able to send an email to user with link to recover password', async () => {
        const password = 'mypassword';
        const passwordHash = await hash(password, 8);
        const user = {
            name: 'Test',
            email: 'test@mail.com',
            password: passwordHash,
            driver_license: 'XXXXXXX'
        };

        await usersRepositoryInMemory.create(user);

        jest.spyOn(mailProvider, 'sendMail')
            .mockImplementation(jest.fn());

        jest.spyOn(usersTokenRepositoryInMemory, 'create');

        await forgotPasswordMailUseCase.execute(user.email);

        expect(mailProvider.sendMail).toHaveBeenCalled();
        expect(usersTokenRepositoryInMemory.create).toHaveBeenCalled();
    })

    it('should not be able to send email to user that does not exist', async () => {
        await expect(
            forgotPasswordMailUseCase.execute('any@mail.com')
        ).rejects.toEqual(new AppError('User does not exist!'))
    })
})
