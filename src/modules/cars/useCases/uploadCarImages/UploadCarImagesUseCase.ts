import { inject, injectable } from "tsyringe";
import { validate } from 'uuid';

import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { IStorageProvider } from "@shared/containers/providers/StorageProvider/IStorageProvider";


interface IRequest {
    car_id: string;
    images_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
    constructor(
        @inject('CarImagesRepository')
        private carImagesRepository: ICarImagesRepository,

        @inject('CarsRepository')
        private carsRepository: ICarsRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}
    
    async execute({ car_id, images_name }: IRequest): Promise<void> {
        this.validateCarId(car_id);

        const car = await this.carsRepository.findById(car_id);

        if (!car) {
            throw new AppError('Car does not exist!');
        }

        images_name.forEach(async imageName => {
            await this.carImagesRepository.create(car_id, imageName);
            await this.storageProvider.save(imageName, 'cars');
        })
    }

    private validateCarId(id: string): void {
        const isValidId = validate(id);

        if (!isValidId) {
            throw new AppError('Invalid id!');
        }
    }
}

export { UploadCarImagesUseCase };
