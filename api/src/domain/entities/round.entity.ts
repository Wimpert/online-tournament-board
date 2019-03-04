import { RoundMatch } from './match.entity';
import { League } from './league.entity';
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Round{

  constructor(name: string){
    this.name = name;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => League, league => league.groups)
  league: League;

  @OneToMany(type => RoundMatch, match => match.round , {cascade: true, eager: true})
  matches: RoundMatch[];

  getMaxMatchNumber(): number{
    return this.matches.reduce((acc: number, match: RoundMatch) => {
      return Math.max(match.matchNr, acc);
    }, 0);
  }

}
