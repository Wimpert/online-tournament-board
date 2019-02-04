import { Group } from './group.entity';
import { Team } from './team.entity';
import { ManyToOne, Column, Entity, TableInheritance, ChildEntity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class Match{


@ManyToOne(type => Team, team => team.homeMatches, {cascade:true, eager: true})
homeTeam: Team;

@ManyToOne(type => Team, team => team.outMatches, {cascade:true, eager: true})
outTeam: Team;

}


@ChildEntity()
export class GroupMatch extends Match{

    constructor(homeTeam : Team, outTeam: Team){
        super();
        this.homeTeam = homeTeam;
        this.outTeam = outTeam;
      }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Group, group => group.matches)
  group: Group;
}


