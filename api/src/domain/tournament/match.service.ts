import { TournamentService } from './tournament.service';
import { Match } from 'domain/entities/match.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from 'domain/entities/tournament.entity';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private tournamentService: TournamentService
  ) {}

  update(match: any) : Observable<Tournament> {
    return from(this.matchRepository.update({id: match.id}, match)).pipe(
        switchMap( _ => this.findTournamentByMatch({id:match.id}))
    );
  }

  findTournamentByMatch(match: any): Observable<Tournament> {
    return this.tournamentService.findByMatch({id: match.id} as Match);
  }
}