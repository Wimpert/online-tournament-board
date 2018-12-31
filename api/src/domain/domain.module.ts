import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserController } from './user/user.controller';
import { TournamentController } from './tournament/tournament.controller';
import { TournamentService } from './tournament/tournament.service';
import { Tournament } from './tournament/tournament.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Tournament, User])],
  providers: [TournamentService, UserService],
  controllers: [TournamentController, UserController],
})
export class DomainModule {}