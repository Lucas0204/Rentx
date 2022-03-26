import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { AppError } from '@shared/errors/AppError';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

let createSpecificationUseCase: CreateSpecificationUseCase;
let specificationsRepositoryInMemory: ISpecificationsRepository;

describe('Create specification', () => {
    beforeEach(() => {
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createSpecificationUseCase = new CreateSpecificationUseCase(
            specificationsRepositoryInMemory
        );
    })

    it('should be able to create a new specification', async () => {
        const data = {
            name: 'Specification',
            description: 'Some specification'
        };
        const specification = await createSpecificationUseCase.execute(data);

        expect(specification).toBeInstanceOf(Specification);
        expect(specification.name).toEqual(data.name);
        expect(specification.description).toEqual(data.description);
    })

    it('should not be able to create a specification that already exists', async () => {
        const data = {
            name: 'Specification',
            description: 'Some specification'
        };
        await createSpecificationUseCase.execute(data);

        await expect(
            createSpecificationUseCase.execute(data)
        ).rejects.toBeInstanceOf(AppError);
    })
})
