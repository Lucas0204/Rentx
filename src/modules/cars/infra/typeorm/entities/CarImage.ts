import { Entity, Column, PrimaryColumn, CreateDateColumn, JoinColumn, OneToMany } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity('car_images')
class CarImage {

    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}


export { CarImage };
