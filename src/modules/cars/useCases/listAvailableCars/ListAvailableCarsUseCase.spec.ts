import { v4 as uuidv4 } from 'uuid';

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory"
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: ICarsRepository;
let categoriesRepositoryInMemory: ICategoriesRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;

describe('List all available cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();

        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory, 
            categoriesRepositoryInMemory
        );
    })

    it('should be able to list all available cars', async () => {
        const carData: ICreateCarDTO = {
            name: 'Car1',
            description: 'test car',
            daily_rate: 140,
            license_plate: 'XXXXXXX',
            brand: 'Test',
            fine_amount: 60,
            category_id: 'category'
        }

        const car = await carsRepositoryInMemory.create(carData);

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([ car ]);
    })

    it('should be able to list all available cars by name', async () => {
        const carData: ICreateCarDTO = {
            name: 'Car2',
            description: 'test car',
            daily_rate: 140,
            license_plate: 'XXXXXXX',
            brand: 'Test',
            fine_amount: 60,
            category_id: 'category'
        }

        const car = await carsRepositoryInMemory.create(carData);

        const carTakedByName = await listAvailableCarsUseCase.execute({ name: car.name });

        expect(carTakedByName).toEqual([ car ]);
    })

    it('should be able to list all available cars by brand', async () => {
        const carData: ICreateCarDTO = {
            name: 'Car3',
            description: 'test car',
            daily_rate: 140,
            license_plate: 'XXXXXXX',
            brand: 'Test',
            fine_amount: 60,
            category_id: 'category'
        }

        const car = await carsRepositoryInMemory.create(carData);

        const carTakedByBrand = await listAvailableCarsUseCase.execute({ brand: car.brand });

        expect(carTakedByBrand).toEqual([ car ]);
    })

    it('should be able to list all available cars by category_id', async () => {
        const categoryName = 'category';

        await categoriesRepositoryInMemory.create({
            name: categoryName,
            description: 'category description'
        });

        const category = await categoriesRepositoryInMemory.findByName(categoryName);

        const carData: ICreateCarDTO = {
            name: 'Car3',
            description: 'test car',
            daily_rate: 140,
            license_plate: 'XXXXXXX',
            brand: 'Test',
            fine_amount: 60,
            category_id: category.id
        }

        const car = await carsRepositoryInMemory.create(carData);

        const carTakedByCategory = await listAvailableCarsUseCase.execute({ 
            category_id: car.category_id 
        });

        expect(carTakedByCategory).toEqual([ car ]);
    })

    it('must not list available cars by a invalid category_id', async () => {
        const carData: ICreateCarDTO = {
            name: 'Car3',
            description: 'test car',
            daily_rate: 140,
            license_plate: 'XXXXXXX',
            brand: 'Test',
            fine_amount: 60,
            category_id: 'INVALID_ID'
        }

        expect(async () => {
            const car = await carsRepositoryInMemory.create(carData);

            await listAvailableCarsUseCase.execute({ 
                category_id: car.category_id 
            });

        }).rejects.toBeInstanceOf(AppError);
    })

    it('must not list available cars by a category_id that does not exist', async () => {
        const carData: ICreateCarDTO = {
            name: 'Car3',
            description: 'test car',
            daily_rate: 140,
            license_plate: 'XXXXXXX',
            brand: 'Test',
            fine_amount: 60,
            category_id: uuidv4()
        }

        expect(async () => {
            const car = await carsRepositoryInMemory.create(carData);

            await listAvailableCarsUseCase.execute({ 
                category_id: car.category_id 
            });

        }).rejects.toBeInstanceOf(AppError);
    })
})
