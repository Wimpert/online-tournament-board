import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_NAME } from './../constants';
import { JwtStrategy } from './jwt.strategy';
import { Injectable, MiddlewareFunction, NestMiddleware, Inject, HttpStatus, RequestMethod } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtStrategy: JwtStrategy, private jwtService: JwtService){}

  resolve(...args: any[]): MiddlewareFunction {
    return (req , res, next) => {
    if (req.originalUrl === '/api/user'
       || req.originalUrl === '/api/login'
       || (req.originalUrl.startsWith('/api/public-tournament') && req.method === 'GET')) {
        next();
      } else if (req.cookies === undefined || req.cookies[JWT_TOKEN_NAME] === undefined){
       res.sendStatus(HttpStatus.UNAUTHORIZED);
      } else{
        const token = req.cookies[JWT_TOKEN_NAME];
        try {
           if (!this.jwtService.verify(token)) {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
           }
        } catch (error) {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }
        next();
      }
    };
  }
}
