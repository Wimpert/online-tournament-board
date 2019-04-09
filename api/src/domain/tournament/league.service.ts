import { League } from './../entities/league.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from '../entities/tournament.entity';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class LeagueService {
  constructor(
    @InjectRepository(League)
    private readonly leagueRepository: Repository<League>,
  ) {}

  update(league: any): Observable<Tournament> {
    return from(this.leagueRepository.update({id: league.id}, league)).pipe(
        switchMap( _ => this.findOne({id: league.id})),
    );
  }

  findOne(league: any): Observable<any> {
    return from(this.leagueRepository.findOne(league, {relations: ['tournament']}));
  }

  findAllLeagues(tournament: any): Observable<League[]>{
    return from(this.leagueRepository.createQueryBuilder('league')
    .leftJoinAndSelect('league.groups', 'group')
    .leftJoinAndSelect('league.rounds', 'round')
    .leftJoin('league.tournament', 'tournament')
    .where('tournament.id = :id', { id: tournament.id })
    .getMany());
  }
}