import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateUsers1631452295716 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:'users',
                columns:[
                    {
                        name:'id',
                        type:'integer',
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy: 'increment',
                        
                    },
                    {
                        name:"password",
                        type:"varchar",
                        isNullable:true,
                    },
                    
                    {
                        name:'name',
                        type:'varchar',
                    },
                    {
                        name:'email',
                        type:'varchar',
                    },
                    {
                        name:'created_at',
                        type:'timestamp',
                        default:'now()',
                    },
                    {
                        name:'updated_at',
                        type:'timestamp',
                        default:'now()',
                    }

                ]}
            )
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
