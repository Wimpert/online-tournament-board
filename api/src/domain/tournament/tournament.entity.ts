import { User } from './../user/user.entity';
import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { userInfo } from 'os';
import { AbstractEntity } from 'domain/abstract.entity';

@Entity()
export class Tournament extends AbstractEntity {
  @PrimaryColumn()
  name: string;

  @ManyToOne(type => User, user => user.tournaments)
  user: User;
}
