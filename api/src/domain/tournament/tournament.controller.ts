import { JwtService } from '@nestjs/jwt';
import { JWT_TOKEN_NAME } from './../../constants';
import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';
import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  HttpException,
  Req,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { request } from 'http';

@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService, private jwtService: JwtService) {}

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

  @Get()
  findByUser( @Req() request) : Observable<Tournament[]> {
    const token = this.jwtService.decode(request.cookies[JWT_TOKEN_NAME]);
    return this.tournamentService.find({userId: token['user'].id});
  }
}
