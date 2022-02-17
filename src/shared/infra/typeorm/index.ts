import { Connection, createConnection, getConnectionOptions } from 'typeorm';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';

export default async (host = 'ignite-database'): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    const database = process.env.NODE_ENV === 'test' ? 'rentx_test' : defaultOptions.database;

    return await createConnection(
        Object.assign(defaultOptions, {
            host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
            database,
            entities: [
                User,
                Car,
                Rental,
                CarImage,
                Category,
                Specification
            ]
        })
    );
}
