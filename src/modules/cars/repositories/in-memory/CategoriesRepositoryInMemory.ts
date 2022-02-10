import { Category } from '../../infra/typeorm/entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';
 
class CategoriesRepositoryInMemory implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        })

        this.categories.push(category);
    }
    
    async findByName(name: string): Promise<Category> {
        const category = this.categories.find(category => category.name === name);
        return category;
    }

    async get(): Promise<Category[]> {
        return this.categories;
    }
}

export { CategoriesRepositoryInMemory };
