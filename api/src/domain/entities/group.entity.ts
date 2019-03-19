import { Match } from './match.entity';
import { GroupMatch } from './match.entity';
import { Team } from './team.entity';
import { League } from './league.entity';
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Group{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => League, league => league.groups)
  league: League;

  @OneToMany(type => Team, team => team.group , {cascade: true, eager: true})
  teams: Team[];

  @OneToMany(type => GroupMatch, match => match.group , {cascade: true, eager: true})
  matches: GroupMatch[];

  getTeamById(id: number){
    return this.teams.find((team: Team) => team.id === id);
  }

  private _allMatchesPlayed: boolean;

  get allMatchesPlayed(): boolean{
    return this._allMatchesPlayed;
  }

  set allMatchesPlayed(played: boolean){
    this._allMatchesPlayed = played;
  }

  getMaxMatchNumber(): number{
    return this.matches.reduce((acc: number, match: Match) => {
      return Math.max(match.matchNr, acc);
    }, 0);
  }

}
