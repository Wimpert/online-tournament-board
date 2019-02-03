import { User } from './user.entity';
import { Entity, PrimaryColumn, ManyToOne, Column, PrimaryGeneratedColumn } from 'typeorm';
import { userInfo } from 'os';
import { AbstractEntity } from 'domain/abstract.entity';
import { Tournament } from './tournament.entity';

@Entity()
export class League{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Tournament, tournament => tournament.leagues)
  tournament: Tournament;
}
