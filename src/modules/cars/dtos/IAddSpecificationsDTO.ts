import { Specification } from "../infra/typeorm/entities/Specification";

export interface IAddSpecificationsDTO {
    car_id: string;
    specifications: Specification[];
}
