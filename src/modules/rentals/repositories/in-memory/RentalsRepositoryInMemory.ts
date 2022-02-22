import { ICloseRentalDTO } from "@modules/rentals/dtos/ICloseRentalDTO";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[];

    constructor() {
        this.rentals = [];
    }

    async create({
        car_id,
        user_id,
        expected_return_date
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = new Rental();

        Object.assign(rental, {
            car_id,
            user_id,
            expected_return_date,
            start_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        })

        this.rentals.push(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.car_id === car_id 
                && rental.start_date !== null 
                && rental.end_date == null
        );
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(
            rental => rental.user_id === user_id
                && rental.start_date !== null
                && rental.end_date == null
        );
    }

    async findById(id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.id === id);
    }

    async closeRental({
        rental_id,
        end_date,
        total
    }: ICloseRentalDTO): Promise<void> {
        const index = this.rentals.findIndex(rental => rental.id === rental_id);

        Object.assign(this.rentals[index], {
            end_date,
            total
        });
    }
}

export { RentalsRepositoryInMemory };
