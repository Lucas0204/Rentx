import { createConnection, getConnectionOptions } from 'typeorm';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

interface IOptions {
    host: string;
}

getConnectionOptions().then(options => {
    const newOptions = options as IOptions;
    newOptions.host = 'ignite-database';
    createConnection({
        ...options,
        entities: [
            User,
            Car,
            Category,
            Specification
        ]
    });
})
