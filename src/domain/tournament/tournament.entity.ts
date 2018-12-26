import { User } from './../user/user.entity';
import { Entity, PrimaryColumn, ManyToOne } from "typeorm";
import { userInfo } from 'os';

@Entity()
export class Tournament {

  @PrimaryColumn()
  name: string;


  @ManyToOne(type => User, user =>  user.tournaments)
  user: User
  
}