import { tap } from 'rxjs/operators';
import { UserService } from './../user/user.service';
import { Injectable, MiddlewareFunction, NestMiddleware, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginMiddleware implements NestMiddleware {

  constructor(private userService: UserService){}


  resolve(...args: any[]): MiddlewareFunction {
    
    return (req, res, next) => {
      const credentials = req.body;
      this.userService.findOne({username: credentials.username}).pipe(
        tap((user) => {
          if(user && bcrypt.compareSync(credentials.password, user.password)){
            if(!req.locals){
              req.locals = {};
            }
            req.locals.user = {id: user.id, email: user.email, username: user.userName}
            next();
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        })
      ).subscribe();
  }
}
}
