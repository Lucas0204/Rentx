import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('Create car specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();

        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    })

    it('should be able to add a specification on a car', async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'Car1',
            description: 'Test car',
            daily_rate: 140,
            brand: 'Test',
            fine_amount: 30,
            license_plate: 'XXXXXX',
            category_id: 'category'
        });

        const specification = await specificationsRepositoryInMemory.create({
            name: 'Specification test',
            description: 'test'
        });

        const carWithSpecification = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id: [ specification.id ]
        });

        console.log(carWithSpecification);

        expect(carWithSpecification.specifications).toEqual([ specification ]);
    });

    it('should not be able to add specification on a car that does not exist', async () => {
        expect(async () => {
            const car_id = 'car_does_not_exist';

            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id: [ 'any' ]
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to add a specification that do not exist on a car', async () => {
        expect(async () => {
            const car = await carsRepositoryInMemory.create({
                name: 'Car1',
                description: 'Test car',
                daily_rate: 140,
                brand: 'Test',
                fine_amount: 30,
                license_plate: 'XXXXXX',
                category_id: 'category'
            });

            const specifications_id = [ 'specification_does_not_exist' ];

            await createCarSpecificationUseCase.execute({
                car_id: car.id,
                specifications_id
            });
        }).rejects.toBeInstanceOf(AppError);
    });
})
