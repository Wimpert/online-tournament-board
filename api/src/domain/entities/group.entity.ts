import { GroupMatch } from './match.entity';
import { Team } from './team.entity';
import { League } from './league.entity';
import { User } from './user.entity';
import { Entity, PrimaryColumn, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { userInfo } from 'os';
import { AbstractEntity } from 'domain/entities/abstract.entity';
import { Tournament } from './tournament.entity';

@Entity()
export class Group{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => League, league => league.groups)
  league: League;

  @OneToMany(type => Team, team => team.group , {cascade:true, eager: true})
  teams: Team[]

  @OneToMany(type => GroupMatch, match => match.group , {cascade:true, eager: true})
  matches: GroupMatch[]

  getTeamById(id: number){
    return this.teams.find((team: Team) => team.id === id);
  }


}
