import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/containers/providers/IDateProvider";
import { AppError } from "@shared/errors/AppError";


interface IRequest {
    rental_id: string;
    user_id: string;
}

@injectable()
class RentalDevolutionUseCase {
    private minimumDaily: number;
    private dateNow: Date;
    private user_id: string;

    constructor(
        @inject('RentalsRepository')
        private rentalsRepository: IRentalsRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('DateProvider')
        private dateProvider: IDateProvider
    ) 
    {
        this.minimumDaily = 1;
        this.dateNow = this.dateProvider.dateNow();
    }

    async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
        let rental = await this.rentalsRepository.findById(rental_id);
        
        this.user_id = user_id;
        this.rentalValidation(rental);

        const car = await this.carsRepository.findById(rental.car_id);

        let daily = this.dateProvider.getDiffInDays(
            rental.start_date,
            this.dateNow
        );

        if (daily <= 0) {
            daily = this.minimumDaily;
        }

        let total = car.daily_rate * daily;

        const delayInDays = this.dateProvider.getDiffInDays(
            rental.expected_return_date,
            this.dateNow
        );

        if (delayInDays > 0) {
            const calculateFineAmount = delayInDays * car.fine_amount;
            total += calculateFineAmount;
        }

        await this.carsRepository.updateAvailable({
            car_id: car.id,
            available: true
        });

        rental = await this.rentalsRepository.closeRental({
            rental_id,
            end_date: this.dateNow,
            total
        });

        return rental;
    }

    private rentalValidation(rental: Rental): void {
        if (!rental) {
            throw new AppError('Rental not found!', 404);
        }

        if (rental.end_date) {
            throw new AppError('This rental has already been returned!');
        }

        if (rental.user_id !== this.user_id) {
            throw new AppError('This rental does not belong to you!');
        }
    }
}

export { RentalDevolutionUseCase };
