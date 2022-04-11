import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Funcionarios1631458542998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await  queryRunner.createTable(
          new Table({
            name:"funcionarios",
            columns:[
                {
                    name:"id",
                    type:'uuid',
                    isPrimary:true,
                },
                {
                    name:"name",
                    type:"varchar",

                },
                {
                    name:"filial_id",
                    type:"uuid",
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
                
            ],
            foreignKeys:[
                {
                    name:"FkFiliais",
                    referencedTableName:"filiais",
                    referencedColumnNames:["id"],
                    columnNames:["filial_id"],
                    onDelete:"CASCADE"
                }
            ]
          })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("funcionarios");
    }

}
