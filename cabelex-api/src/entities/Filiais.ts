import {Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {v4 as uuid} from 'uuid';
@Entity("filiais")
export class Filiais {
    @PrimaryGeneratedColumn('increment')
    readonly id:number;

    @Column()
    name:string;
    
    @CreateDateColumn()
    created_at:Date;

    @UpdateDateColumn()
    updated_at:Date;


    // constructor(){
    //     if(!this.id){
    //         this.id = uuid();
    //     }
        
    // }
}
