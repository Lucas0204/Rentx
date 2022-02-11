import 'dotenv/config';
import createDatabaseConnection from '../index';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcryptjs';

async function create() {
    const connection = await createDatabaseConnection('localhost');

    const id = uuidv4();
    const password = await hash(process.env.ADMIN_PASS, 8);
    const email = process.env.ADMIN_EMAIL;

    await connection.query(
        `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'admin', '${email}', '${password}', true, 'now()', 'XXXXXX')
        `
    )

    await connection.close();
}

create().then(() => console.log('User admin was created!'));
