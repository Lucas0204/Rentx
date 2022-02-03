import { Router } from 'express';
import { listCategoriesController } from '../modules/cars/useCases/listCategories';
import { createCategoryController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (request, response) => {
    return createCategoryController.handle(request, response);
})

categoriesRoutes.get('/', (request, response) => {
    return listCategoriesController.handle(request, response);
})

export { categoriesRoutes };
