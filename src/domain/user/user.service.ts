import { User } from './user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { from, Observable } from "rxjs";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}
      
      save(user: User) : Observable<User>{
          return from(this.userRepository.save(user));
      }

      findOne(id: number) : Observable<User>{
          return from(this.userRepository.findOne(id));
      }

}