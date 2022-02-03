import { createReadStream } from 'fs';
import { parse } from 'csv-parse';

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

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
                resolve(categories);
            })
            .on('error', err => {
                reject(err.message);
            })
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(category => {
            const { name, description } = category;

            const categoryExists = this.categoriesRepository.findByName(name);

            if (!categoryExists) {
                this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }
}

export { ImportCategoryUseCase };
