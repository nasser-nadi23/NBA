import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Team } from "./team.entity";

@Entity()
export class Player extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  player_name: string;

  @Column()
  position: string;

  @Column()
  height: number;

  @Column()
  weight: number;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  salary: number;

  @ManyToOne(() => Team, (team) => team.players)
  team: Team;
}
