import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Coach } from "./coach.entity";
import { Player } from "./player.entity";

@Entity()
export class Team extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  founded: number;

  @Column()
  nickname: string;

  @Column()
  championships: number;

  @Column()
  coachId: number;

  @OneToOne(() => Coach, (coach) => coach.team)
  @JoinColumn()
  coach: Coach;

  @OneToMany(() => Player, (player) => player.team)
  players: Player[];
}
