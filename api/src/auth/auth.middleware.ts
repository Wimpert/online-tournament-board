import { JwtStrategy } from './jwt.strategy';
import { Injectable, MiddlewareFunction, NestMiddleware, Inject } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  constructor(private readonly jwtStrategy: JwtStrategy){}

  resolve(...args: any[]): MiddlewareFunction {
    return (req, res, next) => {
      console.log('in middle ware');
      console.log(req.headers);
      next();
    };
  }
}
