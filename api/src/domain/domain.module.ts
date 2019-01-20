import { LoginController } from './login/login.controller';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentService } from './tournament/tournament.service';
import { Tournament } from './tournament/tournament.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { AuthService } from 'auth/auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User]), AuthModule],
  providers: [TournamentService, UserService, AuthService],
  controllers: [TournamentController, UserController, LoginController],
})
export class DomainModule {}
