import { Specification } from '../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
    findByName(name: string): Promise<Specification>;
    findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationsRepository };
