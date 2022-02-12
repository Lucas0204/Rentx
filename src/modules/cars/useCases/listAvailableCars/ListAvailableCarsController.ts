import { Request, Response }  from 'express';
import { container } from 'tsyringe';
import { IListCarsOptionsDTO } from '@modules/cars/dtos/IListCarsOptionsDTO';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

class ListAvailableCarsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { name, brand, category_id } = request.query as IListCarsOptionsDTO;

        const listAvailableCarsUseCase = container.resolve(ListAvailableCarsUseCase);

        const availableCars = await listAvailableCarsUseCase.execute({
            name,
            brand,
            category_id
        });

        return response.json(availableCars);
    }
}

export { ListAvailableCarsController };
