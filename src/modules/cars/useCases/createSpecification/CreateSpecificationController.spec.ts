import request from 'supertest';
import { Connection } from "typeorm"
import { v4 as uuidv4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import auth from "@config/auth";
import { app } from '@shared/infra/http/app';
import { sign } from "jsonwebtoken";

let connection: Connection;

let adminUserId: string;
let token: string;

describe('Create specification controller', () => {
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

    it('should be able to create a new specification', async () => {
        const response = await request(app).post('/specification').send({
            name: 'Test specification',
            description: 'Test specification'
        }).set({
            Authorization: `Bearer ${token}`
        });

        expect(response.status).toBe(201);
    })
})
