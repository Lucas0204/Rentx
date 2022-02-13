import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { car_id } = request.params;
        const { specifications_id } = request.body;

        if (!car_id ||!specifications_id) {
            return response.status(400).json({
                error: 'Please, provide the data!'
            })
        }

        const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);

        const car = await createCarSpecificationUseCase.execute({
            car_id,
            specifications_id
        });

        return response.json(car);
    }
}

export { CreateCarSpecificationController };
