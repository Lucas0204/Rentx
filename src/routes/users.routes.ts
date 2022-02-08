import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig.upload('./tmp/avatar'));

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    updateUserAvatarController.handle
);

export { usersRoutes };
