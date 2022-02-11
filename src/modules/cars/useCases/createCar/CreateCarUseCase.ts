import { inject, injectable } from 'tsyringe';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateCarUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository
    ) {}

    async execute({
        name,
        description,
        license_plate,
        daily_rate,
        brand,
        category_id,
        fine_amount
    }: ICreateCarDTO): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(license_plate);

        if (carAlreadyExists) {
            throw new AppError('Car already exists!');
        }

        const car = await this.carsRepository.create({
            name,
            description,
            license_plate,
            daily_rate,
            brand,
            category_id,
            fine_amount
        });

        return car;
    }
}

export { CreateCarUseCase };
