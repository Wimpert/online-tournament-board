import { Group } from './group.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
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
  homeMatches: Match[];

  @OneToMany(type => Match, match => match.outTeam )
  outMatches: Match[];

  matchesPlayed: number = 0;
  matchesWon: number = 0;
  matchesLost: number = 0;
  matchesDrawed: number = 0;
  points: number = 0;
  goalsScored: number = 0;
  goalsConcieved: number = 0;

  reset() {
    this.matchesPlayed = 0;
    this.matchesWon = 0;
    this.matchesLost = 0;
    this.matchesDrawed = 0;
    this.points = 0;
    this.goalsScored = 0;
    this.goalsConcieved = 0;
  }

}
