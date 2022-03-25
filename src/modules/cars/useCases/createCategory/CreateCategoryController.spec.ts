import 'dotenv/config';

import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';

import auth from '@config/auth';
import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';

let connection: Connection;
let adminUserId: string;

let token: string;

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        adminUserId = uuidv4();
        const password = 'anypassword';
        const email = 'any@mail.com';

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
                values('${adminUserId}', 'admin', '${email}', '${password}', true, 'now()', 'XXXXXX')
            `
        );

        token = sign({ email }, auth.jwt.secret, {
            subject: adminUserId,
            expiresIn: '1d'
        });
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
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    })

    it('should not be able to create a category that already exists', async () => {
        const response = await request(app).post('/categories').send({
            name: 'Test category',
            description: 'Test cateogory'
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(400);
    })
})
