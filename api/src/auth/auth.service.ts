import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  
  constructor(private readonly jwtService: JwtService) {}

  createToken(jwtPayLoad : JwtPayload) {
    const accessToken = this.jwtService.sign(jwtPayLoad);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  validateUser(payload: JwtPayload): boolean {
    // put some validation logic here
    // for example query user by id/email/username
    return true;
  }
}
