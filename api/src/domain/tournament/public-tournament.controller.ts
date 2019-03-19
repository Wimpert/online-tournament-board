import { Tournament } from '../entities/tournament.entity';
import { TeamService } from './team.service.';
import { Team } from '../entities/team.entity';
import { GroupService } from './group.service';
import { Group } from '../entities/group.entity';
import { Match, GroupMatch } from '../entities/match.entity';
import { MatchService } from './match.service';
import { LeagueService } from './league.service';
import { League } from '../entities/league.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Post, Request, Put, Delete } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_NAME } from '../../constants';
import { TournamentService } from './tournament.service';
import {
  Controller,
  Get,
  Param,
  Body,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';
import { RefereeService } from './referee.service';
import { Referee } from '../entities/referee.entity';

@Controller('public-tournament')
export class PublicTournamentController {
  constructor(private readonly tournamentService: TournamentService, private jwtService: JwtService,
              private leagueService: LeagueService,
              private matchService: MatchService,
              private groupService: GroupService,
              private teamService: TeamService, private refereeService: RefereeService) {}

  @Get('/all/teams')
  findByUser(@Req() request: any): Observable<number> {
    return this.tournamentService.findIdOfFirstactive().pipe(
      switchMap(tournamentId => this.teamService.findAllForTournamentId(tournamentId)),
    );
  }

}
