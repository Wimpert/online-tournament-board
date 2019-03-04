import { Group } from './group.entity';
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tournament } from './tournament.entity';
import { Round } from './round.entity';

@Entity()
export class League{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Tournament, tournament => tournament.leagues)
  tournament: Tournament;

  @OneToMany(type => Group, group => group.league, {cascade: true, eager: true})
  groups: Group[];

  @OneToMany(type => Round, round => round.league, {cascade: true, eager: true})
  rounds: Round[];

  getMaxMatchNumber(): number {
    return Math.max(this.groups.reduce((acc: number, group: Group) => {
      return Math.max(acc, group.getMaxMatchNumber());
    }, 0),
    this.rounds.reduce((acc: number, round: Round) => {
      return Math.max(acc, round.getMaxMatchNumber());
    }, 0),
    );
  }
}
