import { League } from './../entities/league.entity';
import { Team } from './../entities/team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from 'domain/entities/tournament.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  save(team: any): Observable<any> {
    return from(this.teamRepository.save(team));
  }

  delete(team: any): Observable<any> {
    return from(this.teamRepository.delete(team));
  }

  findAllForTournamentId(tournament: any): Observable<Team[]>{
      return from(this.teamRepository.createQueryBuilder('team')
                  .innerJoin('team.group', 'group')
                  .innerJoin('group.league', 'league')
                  .innerJoin('league.tournament', 'tournament')
                  .where('tournament.id = :id', { id: tournament.id })
                  .getMany());
  }

}