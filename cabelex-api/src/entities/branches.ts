import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity("branches")
export class Branches {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    name:string;
    
    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

}
