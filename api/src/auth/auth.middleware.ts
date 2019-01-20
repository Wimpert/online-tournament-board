import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Request } from 'express';
import { JwtStrategy } from './jwt.strategy';
import { Injectable, MiddlewareFunction, NestMiddleware, Inject, HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtStrategy: JwtStrategy){}

  resolve(...args: any[]): MiddlewareFunction {
    return (req : Request, res, next) => {
      if(req.originalUrl === '/api/user' || req.originalUrl === '/api/login'){
        next();
      } else if(req.headers.authorization === undefined || !(req.headers.authorization.split(' ')[0] === 'Bearer')){
       res.send(HttpStatus.UNAUTHORIZED);
      } else{
        const token = JSON.parse(req.headers.authorization.split(' ')[1]) as JwtPayload;
        if(! this.jwtStrategy.validate(token)) {
          res.send(HttpStatus.UNAUTHORIZED);
        }
        next();
      }
    };
  }
}
