import { HOME_TEAM_WINS, OUT_TEAM_WINS, MATCH_IS_DRAW } from './../../constants';
import { Group } from './group.entity';
import { Team } from './team.entity';
import { ManyToOne, Column, Entity, TableInheritance, ChildEntity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Match{

@PrimaryGeneratedColumn()
  id: number;

@ManyToOne(type => Team, team => team.homeMatches, {cascade:true, eager: true})
homeTeam: Team;

@ManyToOne(type => Team, team => team.outMatches, {cascade:true, eager: true})
outTeam: Team;

@Column()
homeTeamScore:number;

@Column()
outTeamScore:number;

@Column()
matchNr: number;

getOutCome() : number {
  if(this.homeTeamScore > this.outTeamScore){
      return HOME_TEAM_WINS;
  } else if(this.outTeamScore > this.homeTeamScore){
      return OUT_TEAM_WINS;
  }
  return MATCH_IS_DRAW;
}

}


@ChildEntity()
export class GroupMatch extends Match{

    constructor(homeTeam : Team, outTeam: Team, matchNr: number){
        super();
        this.homeTeam = homeTeam;
        this.outTeam = outTeam;
        this.matchNr = matchNr;
      }

  

  @ManyToOne(type => Group, group => group.matches)
  group: Group;
}


