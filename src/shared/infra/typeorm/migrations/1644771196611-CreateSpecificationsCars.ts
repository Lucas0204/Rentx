import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpecificationsCars1644771196611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'specifications_cars',
            columns: [
                {
                    name: 'car_id',
                    type: 'uuid'
                },
                {
                    name: 'specification_id',
                    type: 'uuid'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            foreignKeys: [
                {
                    name: 'FKCarSpecification',
                    referencedTableName: 'cars',
                    referencedColumnNames: [ 'id' ],
                    columnNames: [ 'car_id' ],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                },
                {
                    name: 'FKSpecificationCar',
                    referencedTableName: 'specifications',
                    referencedColumnNames: [ 'id' ],
                    columnNames: [ 'specification_id' ],
                    onDelete: 'SET NULL',
                    onUpdate: 'SET NULL'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('specifications_cars');
    }
}
