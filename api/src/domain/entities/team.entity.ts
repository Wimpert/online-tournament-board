import { Group } from './group.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Match } from './match.entity';

@Entity()
export class Team{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  
  @ManyToOne(type => Group, group => group.teams)
  group: Group;

  @OneToMany(type => Match, match => match.homeTeam )
  homeMatches:  Match[];

  @OneToMany(type => Match, match => match.outTeam )
  outMatches:  Match[];

}
