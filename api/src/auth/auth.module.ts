import { JWT_EXPERATION_TIME } from './../constants';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: JWT_EXPERATION_TIME,
      },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtStrategy],
  exports:[JwtStrategy]
})
export class AuthModule {}
