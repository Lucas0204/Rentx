import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { IListCarsOptionsDTO } from '@modules/cars/dtos/IListCarsOptionsDTO';

export interface ICarsRepository {
    create(data: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(license_plate: string): Promise<Car>;
    getAvailableCars(options: IListCarsOptionsDTO): Promise<Car[]>;
}
