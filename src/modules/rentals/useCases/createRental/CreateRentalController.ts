import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateRentalUseCase } from './CreateRentalUseCase';

class CreateRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { user_id } = request;
        const { car_id, expected_return_date } = request.body;

        if (!car_id || !expected_return_date) {
            return response.status(400).json({
                error: 'No data provided!'
            });
        }
        
        const createRentalUseCase = container.resolve(CreateRentalUseCase);

        const rental = await createRentalUseCase.execute({
            user_id,
            car_id,
            expected_return_date
        });

        return response.status(201).json(rental);
    }
}

export { CreateRentalController };
