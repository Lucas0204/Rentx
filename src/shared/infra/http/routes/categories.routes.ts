import { Router } from 'express';
import multer from 'multer';
import { resolve } from 'path';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import {  ensureAdmin} from '../middlewares/ensureAdmin';

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

const categoriesRoutes = Router();
const upload = multer({
    dest: resolve(__dirname, '..', '..', 'tmp')
});

categoriesRoutes.post('/', ensureAuthenticated, ensureAdmin, createCategoryController.handle);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post('/import', upload.single('file'), ensureAuthenticated, ensureAdmin, importCategoryController.handle);

export { categoriesRoutes };
