import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ForgotPasswordMailUseCase } from './ForgotPasswordMailUseCase';


class ForgotPasswordMailController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        const forgotPasswordMailUseCase = container.resolve(ForgotPasswordMailUseCase);

        await forgotPasswordMailUseCase.execute(email);

        return response.send();
    }
}

export { ForgotPasswordMailController };
