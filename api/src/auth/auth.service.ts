import { JWT_EXPERATION_TIME } from './../constants';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  
  constructor(private readonly jwtService: JwtService) {}

  createToken(jwtPayLoad : JwtPayload) {
    const accessToken = this.jwtService.sign(jwtPayLoad);
    return {
      expiresIn: JWT_EXPERATION_TIME,
      accessToken,
    };
  }

  validateUser(payload: JwtPayload): boolean {
    // put some validation logic here
    // for example query user by id/email/username
    return true;
  }

  getUserIdFromJwt(payload: JwtPayload): number {
    return 9;
  }
}
