import { League } from './../entities/league.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from 'domain/entities/tournament.entity';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
  ) {}

  update(league: any) : Observable<Tournament> {
    return from(this.leagueRepository.update({id:league.id}, league)).pipe(
        switchMap( _ => this.findOne({id:league.id}))
    );
  }

  findOne(league: any): Observable<any> {
    return from(this.leagueRepository.findOne(league,{relations:["tournament"]}));
  }
}