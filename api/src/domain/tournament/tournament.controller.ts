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
import { create } from 'domain';
import { User } from 'domain/entities/user.entity';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService, private jwtService: JwtService, private leagueService: LeagueService, private matchService: MatchService) {}

  @Get('/all')
  findByUser(@Req() request: any) : Observable<Tournament[]> {
    const token = this.jwtService.decode(request.cookies[JWT_TOKEN_NAME]);
    return this.tournamentService.find({userId: token['user'].id});
  }
  
  @Get(':id')
  findById(@Param('id') id): Observable<Tournament> {
    return this.tournamentService.findOne({id:id}).pipe(
      map(tournament => {
        if (tournament === undefined) {
          throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
        }
        return tournament;
      }),
    );
  }

  @Put('/league')
  updateLeague(@Body() league : League) : Observable<Tournament> {
    return this.leagueService.update(league);
  }

  @Put('/match')
  updateMatch(@Body() match : Match) : Observable<Tournament> {
    console.log(match);
    return this.matchService.update(match);
  }

  @Put()
  update(@Body() tournament : Tournament) : Observable<Tournament> {
    return this.tournamentService.update(tournament);
  }

  @Post()
  create(@Request() req) : Observable<Tournament> {
    const tournamentToSave = this.tournamentService.createNew(Number(this.jwtService.decode(req.cookies[JWT_TOKEN_NAME])['user'].id));
    return this.tournamentService.save(tournamentToSave);
  };

  @Delete(':id')
  delete(@Param('id') id, @Request() req) : Observable<DeleteResult> {
   return this.tournamentService.findOne({id:id, user: Number(this.jwtService.decode(req.cookies[JWT_TOKEN_NAME])['user'].id)}).pipe(
     filter(tournament => tournament !== undefined),
     switchMap(_ => this.tournamentService.delete(id))
   );
  };
 
}
