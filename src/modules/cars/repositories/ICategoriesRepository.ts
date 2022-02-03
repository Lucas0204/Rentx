import { Category } from "../model/Category";
import { CategoriesRepository } from "./CategoriesRepository";

interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    create({ name, description }: ICreateCategoryDTO): void;
    findByName(name: string): Category;
    get(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
