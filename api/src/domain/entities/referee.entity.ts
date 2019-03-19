import { Match } from './match.entity';
import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity()
export class Referee{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => Match, match => match.referee , {cascade: false, eager: false})
  matches: Match[];
}