import { getRepository, Repository } from "typeorm";

import { Rental } from "../entities/Rental";
import { ICloseRentalDTO } from "@modules/rentals/dtos/ICloseRentalDTO";
import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

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
        const rental = await this.repository.findOne({
            where: { car_id, end_date: null } 
        });

        return rental;
    }

    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        const rental = await this.repository.findOne({
            where: { user_id, end_date: null }
        });

        return rental;
    }

    async findById(id: string): Promise<Rental> {
        return await this.repository.findOne(id);
    }

    async closeRental({
        rental_id,
        end_date,
        total
    }: ICloseRentalDTO): Promise<Rental> {
        const rental = await this.repository.findOne({ id: rental_id });

        return await this.repository.save({
            ...rental,
            end_date,
            total
        });
    }

    async findByUserId(user_id: string): Promise<Rental[]> {
        return await this.repository.find({
            where: { user_id },
            relations: [ 'car' ]
        });
    }
}

export { RentalsRepository };
