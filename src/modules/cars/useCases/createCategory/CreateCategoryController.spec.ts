import 'dotenv/config';

import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import { DayjsDateProvider } from '@shared/containers/providers/DateProvider/implementation/DayjsDateProvider';
import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';

let connection: Connection;
let adminUserId: string;

let usersTokenRepository: IUsersTokenRepository;
let refresh_token: string;

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        usersTokenRepository = new UsersTokenRepository();

        adminUserId = uuidv4();
        const password = 'anypassword';
        const email = 'any@mail.com';

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
                values('${adminUserId}', 'admin', '${email}', '${password}', true, 'now()', 'XXXXXX')
            `
        );

        const token = sign({ email }, auth.refresh_token_secret, {
            subject: adminUserId,
            expiresIn: '1d'
        });

        const dateProvider = new DayjsDateProvider();

        const userToken = await usersTokenRepository.create({
            user_id: adminUserId,
            refresh_token: token,
            expires_date: dateProvider.addDays(1)
        })

        refresh_token = userToken.refresh_token;
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it('should be able to create a new category', async () => {
        const response = await request(app).post('/categories').send({
            name: 'Test category',
            description: 'Test cateogory'
        }).set({
            Authorization: `Bearer ${refresh_token}`
        });

        expect(response.status).toBe(201);
    })

    it('should not be able to create a category that already exists', async () => {
        const response = await request(app).post('/categories').send({
            name: 'Test category',
            description: 'Test cateogory'
        }).set({
            Authorization: `Bearer ${refresh_token}`
        });

        expect(response.status).toBe(400);
    })
})
