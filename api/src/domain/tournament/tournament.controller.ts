import { TeamService } from './team.service.';
import { Team } from './../entities/team.entity';
import { GroupService } from './group.service';
import { Group } from './../entities/group.entity';
import { Match } from 'domain/entities/match.entity';
import { MatchService } from './match.service';
import { LeagueService } from './league.service';
import { League } from './../entities/league.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Post, Request, Put, Delete } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_NAME } from './../../constants';
import { TournamentService } from './tournament.service';
import { Tournament } from '../entities/tournament.entity';
import {
  Controller,
  Get,
  Param,
  Body,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, filter, switchMap, tap } from 'rxjs/operators';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService, private jwtService: JwtService,
              private leagueService: LeagueService,
              private matchService: MatchService,
              private groupService: GroupService,
              private teamService: TeamService) {}

  @Get('/all')
  findByUser(@Req() request: any): Observable<Tournament[]> {
    const token = this.jwtService.decode(request.cookies[JWT_TOKEN_NAME]);
    return this.tournamentService.find({userId: token.user.id});
  }

  @Get(':id')
  findById(@Param('id') id): Observable<Tournament> {
    return this.tournamentService.findOne({id}).pipe(
      map(tournament => {
        if (tournament === undefined) {
          throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
        }
        return tournament;
      }),
    );
  }

  @Put('/league')
  updateLeague(@Body() league: League): Observable<Tournament> {
    return this.leagueService.update(league);
  }

  @Put('/match')
  updateMatch(@Body() match: Match): Observable<Tournament> {
    return this.matchService.update(match).pipe(
      switchMap(_ => this.tournamentService.findByMatch(match)),
    );
  }

  @Put('/team')
  updateTeam(@Body() team: Team): Observable<Tournament> {
    return this.teamService.save(team).pipe(
      switchMap(_ => this.tournamentService.findByTeam(team)),
    );
  }

  @Put('/group')
  updateGroup(@Body() group: Group): Observable<Tournament> {
    return this.groupService.save(group).pipe(
      switchMap(_ => this.tournamentService.findByGroup(group)),
    );
  }

  @Put('/addToKnockoutRound/:id')
  addToKnockoutRound(@Param('id') leagueId: number): Observable<Tournament> {
    return this.tournamentService.findOne({leagues: [{id: leagueId}]}).pipe(
      map((tournament: Tournament) => this.tournamentService.processMatches(tournament)),
      tap((tournament: Tournament) =>  {
        const leagueToProcess = tournament.leagues.find(league =>  {

          return league.id === Number(leagueId);
        });
        if (leagueToProcess){
          this.tournamentService.addToNextRound(leagueToProcess);
        }

      }),
      switchMap((tournament: Tournament) => this.tournamentService.save(tournament)),
    );
  }

  @Post('/addGroup/leagueId/:leagueId')
  addGroupToLeague(@Param('leagueId') leagueId: number){
    const group = new Group();
    group.league = {id: leagueId} as League;
    group.name = new Date().toString();

    return this.groupService.save(group).pipe(
      switchMap(_ =>  this.tournamentService.findOne({leagues: [{id: leagueId}]}).pipe(
        map((tournament: Tournament) => this.tournamentService.processMatches(tournament))),
    ));
  }

  @Post('/addTeam/groupId/:groupId')
  addTeamToGroup(@Param('groupId') groupId: number){
    const team = new Team();
    team.group = {id: groupId} as Group;
    team.name = new Date().toString();

    return this.teamService.save(team).pipe(
      switchMap(_ =>  this.tournamentService.findOne({groups: [{id: groupId}]}).pipe(
        map((tournament: Tournament) => this.tournamentService.processMatches(tournament))),
    ));
  }

  @Put()
  update(@Body() tournament: Tournament): Observable<Tournament> {
    return this.tournamentService.update(tournament);
  }

  @Post()
  create(@Request() req): Observable<Tournament> {
    const tournamentToSave = this.tournamentService.createNew(Number(this.jwtService.decode(req.cookies[JWT_TOKEN_NAME]).user.id));
    return this.tournamentService.save(tournamentToSave);
  }

  @Delete(':id')
  delete(@Param('id') id, @Request() req): Observable<DeleteResult> {
   return this.tournamentService.findOne({id, user: Number(this.jwtService.decode(req.cookies[JWT_TOKEN_NAME]).user.id)}).pipe(
     filter(tournament => tournament !== undefined),
     switchMap(_ => this.tournamentService.delete(id)),
   );
  }

  @Delete('/team/:teamId')
  deleteTeam(@Param('teamId') teamId): Observable<DeleteResult> {
   return this.teamService.remove({id: teamId});
  }

  @Delete('/group/:groupId')
  deleteGroup(@Param('groupId') groupId): Observable<DeleteResult> {
   return this.groupService.remove({id: groupId});
  }
}
