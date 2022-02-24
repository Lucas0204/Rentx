import { container } from 'tsyringe';

import '@shared/containers/providers/index';

import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { UsersTokenRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';

container.registerSingleton<ICategoriesRepository>(
    'CategoriesRepository',
    CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
    'SpecificationsRepository',
    SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<ICarsRepository>(
    'CarsRepository',
    CarsRepository
);

container.registerSingleton<ICarImagesRepository>(
    'CarImagesRepository',
    CarImagesRepository
);

container.registerSingleton<IRentalsRepository>(
    'RentalsRepository',
    RentalsRepository
);

container.registerSingleton<IUsersTokenRepository>(
    'UsersTokenRepository',
    UsersTokenRepository
)
