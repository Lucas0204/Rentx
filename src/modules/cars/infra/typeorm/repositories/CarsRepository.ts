import { IAddSpecificationsDTO } from "@modules/cars/dtos/IAddSpecificationsDTO";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { IListCarsOptionsDTO } from "@modules/cars/dtos/IListCarsOptionsDTO";
import { IUpdateAvailableDTO } from "@modules/cars/dtos/IUpdateAvailableDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }
    
    async create({
        name,
        description,
        daily_rate,
        license_plate,
        brand,
        fine_amount,
        category_id
    }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            fine_amount,
            category_id
        });
        
        return await this.repository.save(car);
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate });
        return car;
    }

    async getAvailableCars({
        name,
        brand,
        category_id
    }: IListCarsOptionsDTO): Promise<Car[]> {
        const query = this.repository
            .createQueryBuilder('car')
            .where('car.available = :available', { available: true });
        
        if (name) {
            query.andWhere('car.name = :name', { name });
        }

        if (brand) {
            query.andWhere('car.brand = :brand', { brand });
        }

        if (category_id) {
            query.andWhere('car.category_id = :category_id', { category_id });
        }

        return await query.getMany();
    }

    async findById(id: string): Promise<Car> {
        return await this.repository.findOne(id);
    }

    async addSpecifications({ 
        car_id, 
        specifications 
    }: IAddSpecificationsDTO): Promise<Car> {
        const car = await this.repository.findOne(car_id);

        return await this.repository.save({
            ...car,
            specifications
        });
    }

    async updateAvailable({ car_id, available }: IUpdateAvailableDTO): Promise<void> {
        await this.repository.update({ id: car_id }, { available });
    }
}

export { CarsRepository };
