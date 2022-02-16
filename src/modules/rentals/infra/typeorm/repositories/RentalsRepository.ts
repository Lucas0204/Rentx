import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async create({
        user_id,
        car_id,
        expected_return_date
    }: ICreateRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            expected_return_date
        });

        await this.repository.save(rental);

        return rental;
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ car_id });

        if (rental) {
            if (rental.start_date != null && !rental.end_date) {
                return rental;
            }
        }

        return undefined;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({ user_id });

        if (rental) {
            if (rental.start_date != null && !rental.end_date) {
                return rental;
            }
        }

        return undefined;
    }
}

export { RentalsRepository };
