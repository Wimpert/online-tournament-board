import { LeagueService } from './league.service';
import { League } from './../entities/league.entity';
import { UpdateResult } from 'typeorm';
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
import { map } from 'rxjs/operators';
import { create } from 'domain';
import { User } from 'domain/entities/user.entity';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService, private jwtService: JwtService, private leagueService: LeagueService) {}

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
  updateLeagua(@Body() league : League) : Observable<Tournament> {
    return this.leagueService.update(league);
  }

  @Post()
  create(@Request() req) : Observable<Tournament> {
    const tournamentToSave = this.tournamentService.createNew(Number(this.jwtService.decode(req.cookies[JWT_TOKEN_NAME])['user'].id));
    return this.tournamentService.save(tournamentToSave);
  };
 
}
