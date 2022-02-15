import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";


class CarImagesRepository implements ICarImagesRepository {
    private repository: Repository<CarImage>;

    constructor() {
        this.repository = getRepository(CarImage);
    }

    async create(car_id: string, image_name: string): Promise<void> {
        const carImage = this.repository.create({
            car_id,
            image_name
        });

        await this.repository.save(carImage);
    }
}

export { CarImagesRepository };
