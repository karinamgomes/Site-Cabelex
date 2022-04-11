import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Branches1631457462555 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name:"branches",
                columns:[
                    {
                        name:"id",
                        type:'integer',
                        isPrimary:true,
                        isGenerated:true,
                        generationStrategy: 'increment',
                    },
                    {
                        name:"name",
                        type:"varchar",

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
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("branches");
    }

}
