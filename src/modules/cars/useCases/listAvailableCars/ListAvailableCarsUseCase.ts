import { inject, injectable } from 'tsyringe';
import { validate } from 'uuid';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IListCarsOptionsDTO } from '@modules/cars/dtos/IListCarsOptionsDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { AppError } from '@shared/errors/AppError';


@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({ name, brand, category_id }: IListCarsOptionsDTO): Promise<Car[]> {
        if (category_id) {
            await this.verifyIfCategoryExists(category_id);
        }

        const availableCars = this.carsRepository.getAvailableCars({
            name,
            brand,
            category_id
        });

        return availableCars;
    }

    private async verifyIfCategoryExists(category_id: string): Promise<void> {
        const isValidId = validate(category_id);

        if (!isValidId) {
            throw new AppError('Category does not exist!');
        }

        const categoryExists = await this.categoriesRepository
            .findById(category_id);

        if (!categoryExists) {
            throw new AppError('Category does not exist!');
        }
    }
}

export { ListAvailableCarsUseCase };
