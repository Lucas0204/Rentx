import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export default async (host = 'ignite-database'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return await createConnection(
        Object.assign(defaultOptions, {
            host,
            entities: [
                User,
                Car,
                Category,
                Specification
            ]
        })
    );
}
