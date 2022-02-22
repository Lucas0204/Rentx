import { container } from 'tsyringe';
import { Request, Response } from 'express';

import { RentalDevolutionUseCase } from './RentalDevolutionUseCase';

class RentalDevolutionController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request;
        const { rental_id } = request.params;

        const rentalDevolutionUseCase = container.resolve(RentalDevolutionUseCase);

        const rental = await rentalDevolutionUseCase.execute({
            rental_id,
            user_id
        });

        return response.json(rental);
    }
}

export { RentalDevolutionController };
