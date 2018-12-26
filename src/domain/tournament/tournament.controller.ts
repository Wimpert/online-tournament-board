import { TournamentService } from './tournament.service';
import { Tournament } from './tournament.entity';
import { Controller, Get, Param, Res, HttpStatus, HttpException } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';

@Controller('tournament')
export class TournamentController{
    
    constructor(private readonly tournamentService : TournamentService ){}

    @Get(':id')
    findById(@Param('id') id) : Observable<Tournament>{
         return this.tournamentService.findTournamentById(id).pipe(
             map((tournament) => {
                 if(tournament === undefined){
                     throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
                 }
                 return tournament;
             })
         );
    }
}