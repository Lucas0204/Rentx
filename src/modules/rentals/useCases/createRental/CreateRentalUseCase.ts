import { validate } from 'uuid';
import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IDateProvider } from '@shared/containers/providers/DateProvider/IDateProvider';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider
    ) {}

    async execute({
        user_id,
        car_id,
        expected_return_date
    }: IRequest): Promise<Rental> {
        await this.verifyIfCarExists(car_id);

        const carRented = await this.rentalsRepository.findOpenRentalByCar(car_id);

        if (carRented) {
            throw new AppError('Car is already rented!');
        }

        const userAlreadyHasRental = await this.rentalsRepository.findOpenRentalByUser(user_id);

        if (userAlreadyHasRental) {
            throw new AppError('User already has a rental car');
        }

        this.validateReturnDate(expected_return_date);

        const rental = await this.rentalsRepository.create({
            car_id,
            user_id,
            expected_return_date
        });

        await this.carsRepository.updateAvailable({
            car_id,
            available: false
        });

        return rental;
    }

    private async verifyIfCarExists(car_id: string): Promise<void> {
        const isValidId = validate(car_id);

        if (!isValidId) {
            throw new AppError('Invalid car id!');
        }

        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError('Car does not exist!');
        }
    }

    private validateReturnDate(expected_return_date: Date) {
        const dateNow = this.dateProvider.dateNow();
        const diff = this.dateProvider.getDiffInHours(dateNow, expected_return_date);
        const minimumExpected = 24;

        if (diff < minimumExpected) {
            throw new AppError('Duration of rental is too small!');
        }
    }
}

export { CreateRentalUseCase };
