import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { RentalDevolutionController } from '@modules/rentals/useCases/rentalDevolution/RentalDevolutionController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();

rentalsRoutes.post(
    '/',
    ensureAuthenticated,
    createRentalController.handle
);

rentalsRoutes.post(
    '/devolution/:rental_id',
    ensureAuthenticated,
    rentalDevolutionController.handle
);

export { rentalsRoutes };
