import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    name:string;
    
    @Exclude()
    @Column()
    password:string;
    
    @Column()
    email:string;


    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;


}
