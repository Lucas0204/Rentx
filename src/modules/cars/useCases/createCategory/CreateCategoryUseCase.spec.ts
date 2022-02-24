import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: ICategoriesRepository;
let createCategoryUseCase: CreateCategoryUseCase;

describe('Create category', () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
    });

    it('Should be able to create a new category', async () => {
        const category = {
            name: 'Category test',
            description: 'Test'
        }

        await createCategoryUseCase.execute(category);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    
        expect(categoryCreated).not.toBeUndefined();
        expect(categoryCreated).toHaveProperty('id');
    })

    it('Should not be able to create a category that already exists', async () => {
        const category = {
            name: 'Category test',
            description: 'Test'
        }
        
        await categoriesRepositoryInMemory.create(category);

        await expect(
            createCategoryUseCase.execute(category)
        ).rejects.toEqual(new AppError('Category already exists!'));
    })
})
