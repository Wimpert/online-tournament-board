import { League } from './../entities/league.entity';

import { AuthService } from 'auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from '../entities/tournament.entity';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { User } from 'domain/entities/user.entity';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
    private authService: AuthService
  ) {}

  findOne(tournament: any): Observable<Tournament> {
    return from(this.tournamentRepository.findOne(tournament));
  }

  find(tournament: any): Observable<Tournament[]> {
    return from(this.tournamentRepository.find(tournament));
  }

  save(tournament: any) : Observable<Tournament> {
    return from(this.tournamentRepository.save(tournament));
  }

  createNew(userId: number): Tournament {
    const tour = new Tournament();

    tour.user = {id:userId} as User;

    tour.leagues = [
      {name: 'Mannen'} as League, 
      {name: 'Vrouwen'} as League
    ]

    return tour;

  }

}
