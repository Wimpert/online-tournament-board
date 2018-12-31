import { Tournament } from './../tournament/tournament.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({name:'UserName'})
  userName: string;

  @Column({name: 'FirstName'})
  firstName: string;

  @Column({name:'LastName'})
  lastName: string;

  @OneToMany(type => Tournament, tournament => tournament.user,{eager:true})
  tournaments: Tournament[]

}