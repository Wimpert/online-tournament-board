import { TeamService } from './tournament/team.service.';
import { Team } from './entities/team.entity';
import { GroupService } from './tournament/group.service';
import { Group } from 'domain/entities/group.entity';
import { MatchService } from './tournament/match.service';
import { Match } from 'domain/entities/match.entity';
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
import { RefereeService } from './tournament/referee.service';
import { Referee } from './entities/referee.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User, League, Match, Group, Team, Referee]), AuthModule],
  providers: [ TournamentService, UserService, AuthService, LeagueService, MatchService, GroupService, TeamService, RefereeService],
  controllers: [TournamentController, UserController, LoginController],
})
export class DomainModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoginMiddleware)
    .forRoutes(LoginController);
  }
}
