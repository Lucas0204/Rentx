import { Category } from "../../model/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';


class CategoriesRepository implements ICategoriesRepository {
    private static INSTANCE: CategoriesRepository;
    private categories: Category[];

    private constructor() {
        this.categories = [];
    }

    public static getInstance() {
        if (!this.INSTANCE) {
            this.INSTANCE = new CategoriesRepository();
        }

        return this.INSTANCE;
    }

    create({ name, description }: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()
        });

        this.categories.push(category);
    }

    get(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(category => category.name === name);
        return category;
    }
}


export { CategoriesRepository };
