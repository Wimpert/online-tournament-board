import { TournamentService } from './tournament.service';
import { Match } from '../entities/match.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from '../entities/tournament.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    private tournamentService: TournamentService,
  ) {}

  update(match: any): Observable<UpdateResult> {
    return from(this.matchRepository.update({id: match.id}, match));
  }

  save(match: any): Observable<UpdateResult> {
    return from(this.matchRepository.save(match));
  }

  delete(match: any): Observable<any> {
    return from(this.matchRepository.delete(match));
  }

  findTournamentByMatch(match: any): Observable<Tournament> {
    return this.tournamentService.findByMatch({id: match.id} as Match);
  }

  findMatchesWithTeam(ids: number[]): Observable<Match[]> {
    return from(this.matchRepository.findByIds(ids));
  }
}