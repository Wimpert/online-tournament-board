import { TournamentService } from './tournament.service';
import { Match } from 'domain/entities/match.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from 'domain/entities/tournament.entity';
import { switchMap } from 'rxjs/operators';
import { Referee } from 'domain/entities/referee.entity';

@Injectable()
export class RefereeService {
  constructor(
    @InjectRepository(Referee)
    private readonly refereeRepository: Repository<Referee>,
  ) {}

  findAll(): Observable<Referee[]> {
    return from(this.refereeRepository.find({}));
  }
}