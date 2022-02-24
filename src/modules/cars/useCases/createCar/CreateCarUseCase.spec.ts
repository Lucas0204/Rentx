import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: ICarsRepository;
let createCarUseCase: CreateCarUseCase;

describe('Create car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    })

    it('should be able to create a new car', async () => {
        const car = {
            name: 'TestCar',
            description: 'Test',
            daily_rate: 100,
            license_plate: 'ABC-123',
            brand: 'test',
            fine_amount: 300,
            category_id: 'category'
        };

        const carCreated = await createCarUseCase.execute(car);
    
        expect(carCreated).toHaveProperty('id');
    })

    it('should not be able to create a car that already exists', async () => {
        const car = {
            name: 'TestCar',
            description: 'Test',
            daily_rate: 100,
            license_plate: 'ABC-123',
            brand: 'test',
            fine_amount: 300,
            category_id: 'category'
        };

        await createCarUseCase.execute(car);

        await expect(
            createCarUseCase.execute(car)
        ).rejects.toEqual(new AppError('Car already exists!'));
    })

    it('must create a car with the possibility of being rented by default', async () => {
        const car = {
            name: 'TestCar',
            description: 'Test',
            daily_rate: 100,
            license_plate: 'ABC-123',
            brand: 'test',
            fine_amount: 300,
            category_id: 'category'
        };

        const carCreated = await createCarUseCase.execute(car);

        expect(carCreated.available).toBeTruthy();
    })
})
