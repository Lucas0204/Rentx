import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { RentalDevolutionController } from '@modules/rentals/useCases/rentalDevolution/RentalDevolutionController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const rentalDevolutionController = new RentalDevolutionController();
const listRentalsByUserController = new ListRentalsByUserController();

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

rentalsRoutes.get(
    '/user',
    ensureAuthenticated,
    listRentalsByUserController.handle
);


export { rentalsRoutes };
