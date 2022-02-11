import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarUseCase } from './CreateCarUseCase';
import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { 
            name, 
            description, 
            daily_rate, 
            license_plate, 
            brand, 
            fine_amount, 
            category_id 
        } = request.body as ICreateCarDTO;
        
        const createCarUseCase = container.resolve(CreateCarUseCase);

        const car = await createCarUseCase.execute({
            name, 
            description, 
            daily_rate, 
            license_plate, 
            brand, 
            fine_amount, 
            category_id 
        })

        return response.status(201).json(car);
    }
}

export { CreateCarController };
