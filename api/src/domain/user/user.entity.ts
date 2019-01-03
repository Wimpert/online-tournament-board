import { AbstractEntity } from './../abstract.entity';
import { Tournament } from './../tournament/tournament.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity()
export class User extends AbstractEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'UserName' })
  userName: string;

  @Column({ name: 'FirstName' })
  firstName: string;

  @Column({ name: 'LastName' })
  lastName: string;

  @OneToMany(type => Tournament, tournament => tournament.user, { eager: true })
  tournaments: Tournament[];

}
