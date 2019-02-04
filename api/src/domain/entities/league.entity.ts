import { Group } from './group.entity';
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tournament } from './tournament.entity';

@Entity()
export class League{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Tournament, tournament => tournament.leagues)
  tournament: Tournament;

  @OneToMany(type => Group, group => group.league, {cascade:true, eager: true})
  groups: Group[];
}
