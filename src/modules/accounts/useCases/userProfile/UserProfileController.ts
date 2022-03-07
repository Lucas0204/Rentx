import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { UserProfileUseCase } from './UserProfileUseCase';

class UserProfileController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request;
        
        const userProfileUseCase = container.resolve(UserProfileUseCase);

        const user = await userProfileUseCase.execute(user_id);

        return response.json(user);
    }
}

export { UserProfileController };
