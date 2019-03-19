import { User } from './user.entity';
import { Entity, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstract.entity';
import { League } from './league.entity';

@Entity()
export class Tournament extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => User, user => user.tournaments )
  user: User;

  @OneToMany(type => League, league => league.tournament, {cascade: true, eager: true, onDelete: 'CASCADE'})
  leagues: League[];

  getNextMatchNumber(): number{
    return this.leagues.reduce((acc: number, league: League) => {
      return Math.max(acc, league.getMaxMatchNumber());
    }, 0) + 1;
  }

  static deserialize(input: any): Tournament{
    const tournament = new Tournament();
    Object.assign(tournament, input);
    return tournament;
  }

}
