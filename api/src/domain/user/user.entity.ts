import { AbstractEntity } from './../abstract.entity';
import { Tournament } from './../tournament/tournament.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class User extends AbstractEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @OneToMany(type => Tournament, tournament => tournament.user, { eager: true })
  tournaments: Tournament[];

}
