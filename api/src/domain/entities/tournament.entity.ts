import { User } from './user.entity';
import { Entity, PrimaryColumn, ManyToOne, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { userInfo } from 'os';
import { AbstractEntity } from 'domain/entities/abstract.entity';
import { League } from './league.entity';

@Entity()
export class Tournament extends AbstractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => User, user => user.tournaments )
  user: User;

  @OneToMany(type => League, league => league.tournament, {cascade:true, eager: true, onDelete: 'CASCADE'})
  leagues: League[];

}
