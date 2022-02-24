import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { IDateProvider } from '@shared/containers/providers/IDateProvider';
import { DayjsDateProvider } from '@shared/containers/providers/implementations/DayjsDateProvider';


let rentalsRepositoryInMemory: IRentalsRepository;
let carsRepositoryInMemory: ICarsRepository;
let dateProvider: IDateProvider;
let createRentalUseCase: CreateRentalUseCase;

describe('Create rentals', () => {
    const dateToReturn = dayjs().add(1, 'day').toDate();
    
    const dateSmallerThanAllowed = dayjs().add(23, 'hours').toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory, 
            carsRepositoryInMemory,
            dateProvider
        );
    })

    it('should be able to create a rental', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car test',
            description: 'test',
            license_plate: 'XXXXXX',
            brand: 'car_test',
            daily_rate: 100,
            fine_amount: 40,
            category_id: 'category'
        });

        const user_id = uuidv4();

        const rental = await createRentalUseCase.execute({
            car_id: car.id,
            user_id,
            expected_return_date: dateToReturn
        });

        expect(rental).toHaveProperty('id');
        expect(rental).toHaveProperty('start_date');
    })

    it('should not be able to create a rental with a car that already rented', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car test',
            description: 'test',
            license_plate: 'XXXXXX',
            brand: 'car_test',
            daily_rate: 100,
            fine_amount: 40,
            category_id: 'category'
        });

        await createRentalUseCase.execute({
            car_id: car.id,
            user_id: uuidv4(),
            expected_return_date: dateToReturn
        });

        await expect(
            createRentalUseCase.execute({
                car_id: car.id,
                user_id: uuidv4(),
                expected_return_date: dateToReturn
            })
        ).rejects.toEqual(new AppError('Car is already rented!'));
    })

    it('should not be able to create a rental with a user that already has a rental', async () => {
        const car1 = await carsRepositoryInMemory.create({
            name: 'Car test',
            description: 'test',
            license_plate: 'XXXXXX',
            brand: 'car_test',
            daily_rate: 100,
            fine_amount: 40,
            category_id: 'category'
        });

        const car2 = await carsRepositoryInMemory.create({
            name: 'Cartest',
            description: 'test',
            license_plate: '12XXXXxx',
            brand: 'car_test',
            daily_rate: 100,
            fine_amount: 40,
            category_id: 'category123'
        });

        const user_id = uuidv4();

        await createRentalUseCase.execute({
            car_id: car1.id,
            user_id,
            expected_return_date: dateToReturn
        });

        await expect(
            createRentalUseCase.execute({
                car_id: car2.id,
                user_id,
                expected_return_date: dateToReturn
            })
        ).rejects.toEqual(new AppError('User already has a rental car'));
    })

    it('should not be able to create rental on a car that does not exist', async () => {
        const car_id = uuidv4();
        const user_id = uuidv4();
        
        await expect(
            createRentalUseCase.execute({
                car_id,
                user_id,
                expected_return_date: dateToReturn
            })
        ).rejects.toEqual(new AppError('Car does not exist!'));
    })

    it('should not be able to create rental with a expected return date smaller than 24', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car test',
            description: 'test',
            license_plate: 'XXXXXX',
            brand: 'car_test',
            daily_rate: 100,
            fine_amount: 40,
            category_id: 'category'
        });

        const user_id = uuidv4();

        await expect(
            createRentalUseCase.execute({
                car_id: car.id,
                user_id,
                expected_return_date: dateSmallerThanAllowed
            })
        ).rejects.toEqual(new AppError('Duration of rental is too small!'));
    })
})
