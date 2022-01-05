import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "./team.entity";

@Entity()
export class Coach extends BaseEntity {
 @PrimaryGeneratedColumn()
 id:number

 @Column()
 coach_name:string

 @OneToOne(()=>Team,(team)=>team.coach)
 team:Team
}