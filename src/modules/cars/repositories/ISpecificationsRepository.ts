import { Specification } from '../infra/typeorm/entities/Specification';
import { ICreateSpecificationDTO } from '@modules/cars/dtos/ICreateSpecificationDTO';

interface ISpecificationsRepository {
    create({ name, description }: ICreateSpecificationDTO): Promise<void>;
    findByName(name: string): Promise<Specification>;
}

export { ISpecificationsRepository };
