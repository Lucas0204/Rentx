import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { UploadCarImagesController } from '@modules/cars/useCases/uploadCarImages/UploadCarImagesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const carsRoutes = Router();

const upload = multer(uploadConfig.upload('./tmp/cars'));

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post(
    '/', 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle
);

carsRoutes.post(
    '/images/:car_id',
    ensureAuthenticated,
    ensureAdmin,
    upload.array('images'),
    uploadCarImagesController.handle
);

carsRoutes.post(
    '/specifications/:car_id',
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle
);

carsRoutes.get('/available', listAvailableCarsController.handle);

export { carsRoutes };
