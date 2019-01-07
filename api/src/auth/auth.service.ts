import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  
  constructor(private readonly jwtService: JwtService) {}

  createToken() {
    const user: JwtPayload = { email: 'test@email.com', id:33 };
    const accessToken = this.jwtService.sign(user);
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
