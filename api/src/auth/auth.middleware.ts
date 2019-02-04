import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_NAME } from './../constants';
import { JwtStrategy } from './jwt.strategy';
import { Injectable, MiddlewareFunction, NestMiddleware, Inject, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtStrategy: JwtStrategy, private jwtService: JwtService){}

  resolve(...args: any[]): MiddlewareFunction {
    return (req , res, next) => {
      if(req.originalUrl === '/api/user' || req.originalUrl === '/api/login'){
        next();
      } else if(req.cookies === undefined || req.cookies[JWT_TOKEN_NAME] === undefined){
        console.log('here', req.cookies);
       res.sendStatus(HttpStatus.UNAUTHORIZED);
      } else{
        const token = req.cookies[JWT_TOKEN_NAME];
        try {
           if(!this.jwtService.verify(token)) {
            console.log('here3');
            res.sendStatus(HttpStatus.UNAUTHORIZED);
           }
        } catch (error) {
          console.log('hereS');
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
        next();
      }
    };
  }
}
