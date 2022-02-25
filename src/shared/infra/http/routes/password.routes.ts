import { Router } from 'express';

import { ForgotPasswordMailController } from '@modules/accounts/useCases/forgotPasswordMail/ForgotPasswordMailController';

const passwordRoutes = Router();

const forgotPasswordMailController = new ForgotPasswordMailController();

passwordRoutes.post('/forgot', forgotPasswordMailController.handle);

export { passwordRoutes };
