import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { ICloseRentalDTO } from '@modules/rentals/dtos/ICloseRentalDTO';

export interface IRentalsRepository {
    create(data: ICreateRentalDTO): Promise<Rental>;
    findOpenRentalByCar(car_id: string): Promise<Rental>;
    findOpenRentalByUser(user_id: string): Promise<Rental>;
    findById(id: string): Promise<Rental>;
    closeRental(data: ICloseRentalDTO): Promise<Rental>;
}
