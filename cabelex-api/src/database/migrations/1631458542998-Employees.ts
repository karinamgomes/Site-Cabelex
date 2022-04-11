import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Employees1631458542998 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await  queryRunner.createTable(
          new Table({
            name:"employees",
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
                    name:"branch_id",
                    type:"int",
                    isNullable:true
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
                    name:"FkBranch",
                    referencedTableName:"branches",
                    referencedColumnNames:["id"],
                    columnNames:["branch_id"],
                    onDelete:"CASCADE"
                }
            ]
          })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
    }

}
