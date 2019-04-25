import { Tournament } from '../entities/tournament.entity';
import { TeamService } from './team.service.';
import { Team } from './../entities/team.entity';
import { GroupService } from './group.service';
import { Group } from './../entities/group.entity';
import { Match, GroupMatch } from '../entities/match.entity';
import { MatchService } from './match.service';
import { LeagueService } from './league.service';
import { League } from './../entities/league.entity';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Post, Request, Put, Delete } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_NAME } from './../../constants';
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

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService, private jwtService: JwtService,
              private leagueService: LeagueService,
              private matchService: MatchService,
              private groupService: GroupService,
              private teamService: TeamService, private refereeService: RefereeService) {}

  @Get('/all')
  findByUser(@Req() request: any): Observable<Tournament[]> {
    const token = this.jwtService.decode(request.cookies[JWT_TOKEN_NAME]);
    return this.tournamentService.find({userId: token.user.id});
  }

  @Get('/referee/all')
  getAllReferees(@Req() request: any): Observable<Referee[]> {
    return this.refereeService.findAll();
  }

  @Get('/team/all/:leagueId')
  getAllTeamsforTournament(@Param('leagueId') leagueId): Observable<Team[]> {
    return this.teamService.findAllForLeagueId(leagueId);
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
    if(match.minutes === ''){
      match.minutes = null;
    }
    if(match.hour === ''){
      match.hour = null;
    }
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

  @Post('/addMatch/groupId/:groupId')
  addMatchoGroup(@Param('groupId') groupId: number){
    return this.tournamentService.findByGroup({id: groupId} as Group).pipe(
      map((tournament: Tournament) => {
        return Tournament.deserialize(tournament);
      }),
      map((tournament: Tournament) => {
        const matchNumber = tournament.getNextMatchNumber();
        return { matchNumber, tournament};
      }),
      switchMap( (data: {matchNumber: number, tournament: Tournament}) => {
        const newMatch = new GroupMatch(undefined, undefined, data.matchNumber, undefined, undefined, undefined);
        newMatch.group = {id: groupId} as Group;
        return this.matchService.save(newMatch).pipe(
          map( _ => {
            const group: Group = data.tournament.leagues.map((league: League ) => {
              return league.groups.find((group: Group) => group.id === Number(groupId));
            }).pop();
            if (group){
              if (!group.matches) {
                group.matches = [];
              }
              group.matches.push(newMatch);
            }
            return data.tournament;
          }),
        );
      }),
    );
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
   return this.teamService.delete({id: teamId});
  }

  @Delete('/group/:groupId')
  deleteGroup(@Param('groupId') groupId): Observable<DeleteResult> {
   return this.groupService.delete({id: groupId});
  }

  @Delete('/match/:matchId')
  deleteMatch(@Param('matchId') matchId): Observable<DeleteResult> {
    return this.matchService.delete({id: matchId});
  }
}
