import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

@Entity('users')
class User {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    driver_license: string;

    @Column()
    avatar?: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    @Expose({ name: 'avatar_url' })
    avatar_url(): string {
        switch(process.env.DISK_STORAGE) {
            case 'local':
                return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
            case 's3':
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
            default:
                return null;
        }
    }

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { User };
