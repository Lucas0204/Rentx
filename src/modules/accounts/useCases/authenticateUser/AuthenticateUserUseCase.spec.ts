import 'dotenv/config';
import 'reflect-metadata';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { AppError } from '../../../../errors/AppError';

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: IUsersRepository;

describe('Authenticate user', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    })

    it('should be able to authenticate an user and return token', async () => {
        const user: ICreateUserDTO = {
            name: 'Test',
            email: 'test@test.com',
            password: '1234',
            driver_license: '777'
        };

        await createUserUseCase.execute(user);

        const response = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });

        expect(response).toHaveProperty('token');
        expect(response).toHaveProperty('user');
    })

    it('should not be able to authenticate an user that not exist', () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: 'any@test.com',
                password: '1234'
            })
        }).rejects.toBeInstanceOf(AppError);
    })

    it('should not be able to authenticate an user with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                name: 'Test',
                email: 'test@test.com',
                password: '1234',
                driver_license: '777'
            };

            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: 'incorrectPassword'
            });

        }).rejects.toBeInstanceOf(AppError);
    })
})
