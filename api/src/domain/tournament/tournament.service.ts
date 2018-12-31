import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './tournament.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  findTournamentById(id: string): Observable<Tournament> {
    return from(this.tournamentRepository.findOne(id));
  }
}
