import 'dotenv/config';
import 'reflect-metadata';
import { hash } from 'bcryptjs';

import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { AppError } from '@shared/errors/AppError';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementation/DayjsDateProvider';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;
let usersTokenRepositoryInMemory: IUsersTokenRepository;

let dateProvider: IDateProvider;

describe('Authenticate user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider
        );
    })

    it('should be able to authenticate an user and return token', async () => {
        const password = '1234';
        const passwordHash = await hash(password, 8);
        const user: ICreateUserDTO = {
            name: 'Test',
            email: 'test@test.com',
            password: passwordHash,
            driver_license: '777'
        };

        await usersRepositoryInMemory.create(user);

        const response = await authenticateUserUseCase.execute({
            email: user.email,
            password: password
        });

        expect(response).toHaveProperty('token');
        expect(response).toHaveProperty('user');
    })

    it('should not be able to authenticate an user that not exist', async () => {
        await expect(
            authenticateUserUseCase.execute({
                email: 'any@test.com',
                password: '1234'
            })
        ).rejects.toEqual(new AppError('Email or Password incorrect!'));
    })

    it('should not be able to authenticate an user with incorrect password', async () => {
        const password = await hash('1234', 8);
        const user: ICreateUserDTO = {
            name: 'Test',
            email: 'test@test.com',
            password,
            driver_license: '777'
        };

        await usersRepositoryInMemory.create(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            })
        ).rejects.toEqual(new AppError('Email or Password incorrect!'));
    })
})
