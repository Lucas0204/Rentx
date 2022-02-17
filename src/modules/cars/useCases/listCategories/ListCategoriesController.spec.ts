import 'dotenv/config';

import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import createConnection from '@shared/infra/typeorm';
import { app } from '@shared/infra/http/app';

let connection: Connection;

describe('Create Category Controller', () => {
    beforeAll(async () => {
        connection = await createConnection();
        await connection.runMigrations();

        const id = uuidv4();

        await connection.query(
            `INSERT INTO CATEGORIES(id, name, description, created_at)
                values('${id}', 'category', 'test category', 'now()')
            `
        );
    })

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    })

    it('should be able to list all categories', async () => {
        const response = await request(app).get('/categories');

        expect(response.status).toBe(200);
        expect(response.body[0]).toHaveProperty('id');
    })
})
