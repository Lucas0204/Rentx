import { Category } from "../infra/typeorm/entities/Category";
import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): Promise<void>;
    findByName(name: string): Promise<Category>;
    get(): Promise<Category[]>;
}

export { ICategoriesRepository };
