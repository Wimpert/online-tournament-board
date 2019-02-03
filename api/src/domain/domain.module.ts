import { League } from './entities/league.entity';
import { LeagueService } from './tournament/league.service';
import { LoginMiddleware } from './login/login.middleware';
import { LoginController } from './login/login.controller';
import { UserService } from './user/user.service';
import { User } from './entities/user.entity';
import { UserController } from './user/user.controller';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentService } from './tournament/tournament.service';
import { Tournament } from './entities/tournament.entity';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';
import { AuthService } from 'auth/auth.service';
@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User, League]), AuthModule],
  providers: [ TournamentService, UserService, AuthService, LeagueService],
  controllers: [TournamentController, UserController, LoginController],
})
export class DomainModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(LoginMiddleware)
    .forRoutes(LoginController);
  }
}
