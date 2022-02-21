import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";
import { IListCarsOptionsDTO } from '@modules/cars/dtos/IListCarsOptionsDTO';
import { IAddSpecificationsDTO } from "@modules/cars/dtos/IAddSpecificationsDTO";
import { IUpdateAvailableDTO } from "@modules/cars/dtos/IUpdateAvailableDTO";


class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[];

    constructor() {
        this.cars = [];
    }

    async create({
        name,
        description,
        daily_rate,
        brand,
        fine_amount,
        license_plate,
        category_id
    }: ICreateCarDTO): Promise<Car> {
        const car = new Car();

        Object.assign(car, {
            name,
            description,
            daily_rate,
            license_plate,
            brand,
            fine_amount,
            category_id
        });

        this.cars.push(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        return this.cars.find(car => car.license_plate === license_plate);
    }

    async getAvailableCars({
        name,
        brand,
        category_id
    }: IListCarsOptionsDTO): Promise<Car[]> {
        const cars = this.cars.filter(car => {
            if (car.available) {
                if (name && car.name === name) return car;
                else if (brand && car.brand === brand) return car;
                else if (category_id && car.category_id === category_id) return car;

                return car;
            }
        })

        return cars;
    }

    async findById(id: string): Promise<Car> {
        return this.cars.find(car => 
            car.id === id
        );
    }

    async addSpecifications({ car_id, specifications }: IAddSpecificationsDTO): Promise<Car> {
        const car = this.cars.find(car => car.id === car_id);
        car.specifications = specifications;
        return car;     
    }

    async updateAvailable({ car_id, available }: IUpdateAvailableDTO): Promise<void> {
        const index = this.cars.findIndex(car => car.id === car_id);
        this.cars[index].available = available;
    }
}

export { CarsRepositoryInMemory };
