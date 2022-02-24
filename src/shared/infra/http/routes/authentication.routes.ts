import { Router } from 'express';
import { AuthenticateUserController } from '@modules/accounts/useCases/authenticateUser/AuthenticateUserController';
import { GenerateRefreshTokenController } from '@modules/accounts/useCases/generateRefreshToken/GenerateRefreshTokenController';

const authenticationRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const generateRefreshTokenController = new GenerateRefreshTokenController();

authenticationRoutes.post('/sessions', authenticateUserController.handle);

authenticationRoutes.post('/refresh-token', generateRefreshTokenController.handle);

export { authenticationRoutes };
