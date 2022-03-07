import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import { UserProfileController } from '@modules/accounts/useCases/userProfile/UserProfileController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const userProfileController = new UserProfileController();

const upload = multer(uploadConfig);

usersRoutes.post('/', createUserController.handle);

usersRoutes.patch(
    '/avatar', 
    ensureAuthenticated, 
    upload.single('avatar'), 
    updateUserAvatarController.handle
);

usersRoutes.get('/profile', ensureAuthenticated, userProfileController.handle);

export { usersRoutes };
