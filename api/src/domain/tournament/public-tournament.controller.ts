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
import { Post, Request, Put, Delete, Query } from '@nestjs/common';
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
  findAllTeam(@Req() request: any): Observable<Team[]> {
    return this.tournamentService.findIdOfFirstactive().pipe(
      switchMap(tournamentId => this.teamService.findAllForTournament(tournamentId)),
    );
  }

  @Get('/all/leagues')
  findAllLeagues(@Req() request: any): Observable<League[]> {
    return this.tournamentService.findIdOfFirstactive().pipe(
      switchMap(tournamentId => this.leagueService.findAllLeagues(tournamentId)),
    );
  }

  @Get('/teaminfo/:id')
  findTeamInfoDto(@Req() request: any, @Param('id') id ): Observable<{}> {
    return this.teamService.findTeamInfo(id).pipe(
      tap(console.log),
    );
  }

  @Get('/matches/:teamId')
  findAllMatchesForTeam(@Req() request: any, @Param('teamId') id ): Observable<{}> {
    return this.teamService.findTeamInfo(id).pipe(
      tap(console.log),
    );
  }

  @Get('/group/:groupId')
  getGroupInfo(@Req() request: any, @Param('groupId') id ): Observable<{}> {
    return this.groupService.findOne({id} as Group).pipe(
      map((group: Group) => {
        this.tournamentService.processMatchesOfGroup(group);
        return group;
      }),
      map((group: Group) => {
        return {...group , teams : group.teams.sort(this.tournamentService.compareTeams)};
      }),
    );
  }

  @Get('/match')
  getMatches(@Req() request: any, @Query('ids') ids): Observable<{}> {
    const idsToFind = ids.split(',').map( numberString => Number(numberString));
    return this.matchService.findMatchesWithTeam(idsToFind);
  }

  @Get('/match/all')
  getAllMatches(@Req() request: any, @Query('ids') ids): Observable<{}> {
    return this.tournamentService.findIdOfFirstactive().pipe(
      switchMap(tournamentId => this.matchService.findAllForTournament(tournamentId)),
    );
  }

}
