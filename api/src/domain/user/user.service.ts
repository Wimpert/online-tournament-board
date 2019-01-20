import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  save(user: User): Observable<User> {
    return from(this.userRepository.save(this.encryptPassword(user)));
  }

  findOne(user: any): Observable<User> {
    return from(this.userRepository.findOne(this.encryptPassword(user)));
  }

  encryptPassword(user: User) : User{
    if(user.password){
    const userWithEncryptedPassword = new User();
    Object.assign(userWithEncryptedPassword, user);
    const salt = bcrypt.genSaltSync();
    const cryptedPassWord = bcrypt.hashSync(user.password,salt );
    userWithEncryptedPassword.password = cryptedPassWord;
    console.log(userWithEncryptedPassword);
    return userWithEncryptedPassword;
    }
    return user;
  }
}
