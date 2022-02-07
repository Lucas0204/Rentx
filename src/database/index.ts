import { createConnection, getConnectionOptions } from 'typeorm';
import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
import { User } from '../modules/accounts/entities/User';

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
            Category,
            Specification
        ]
    });
})
