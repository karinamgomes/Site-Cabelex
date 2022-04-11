import { Exclude } from "class-transformer";
import {Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Branches } from "./branches";

@Entity("employees")
export class Employees {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    name:string;
    
    @Exclude()
    @Column()
    branch_id:number;

    @JoinColumn({name:"branch_id"})
    @OneToOne(()=>Branches)
    branch:Branches;

    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;

}
