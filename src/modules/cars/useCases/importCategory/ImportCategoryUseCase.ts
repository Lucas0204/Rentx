import { createReadStream, promises } from 'fs';
import { parse } from 'csv-parse';
import { inject, injectable } from 'tsyringe';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { AppError } from '../../../../errors/AppError';

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    private loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const readableStreamOfFile = createReadStream(file.path);
            const categories: IImportCategory[] = [];

            const parseFile = parse();

            readableStreamOfFile.pipe(parseFile);

            parseFile.on('data', line => {
                const [ name, description ] = line;
                categories.push({
                    name,
                    description
                })
            })
            .on('end', () => {
                promises.unlink(file.path);
                resolve(categories);
            })
            .on('error', err => {
                reject(err.message);
            })
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        try {
            const categories = await this.loadCategories(file);
            categories.map(async category => {
                const { name, description } = category;
    
                const categoryExists = await this.categoriesRepository.findByName(name);
    
                if (!categoryExists) {
                    await this.categoriesRepository.create({
                        name,
                        description
                    })
                }
            })
        } catch (err) {
            throw new AppError(err.message);
        }
    }
}

export { ImportCategoryUseCase };
