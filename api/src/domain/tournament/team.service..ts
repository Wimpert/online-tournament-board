import { League } from './../entities/league.entity';
import { Team } from './../entities/team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Tournament } from 'domain/entities/tournament.entity';
import { Match } from 'domain/entities/match.entity';

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

  findAllForTournament(tournament: any): Observable<Team[]>{
      return from(this.teamRepository.createQueryBuilder('team')
                  .innerJoin('team.group', 'group')
                  .innerJoin('group.league', 'league')
                  .innerJoin('league.tournament', 'tournament')
                  .where('tournament.id = :id', { id: tournament.id })
                  .getMany());
  }

  findAllForLeagueId(leagueId: any): Observable<Team[]>{
    return from(this.teamRepository.createQueryBuilder('team')
                .innerJoin('team.group', 'group')
                .innerJoin('group.league', 'league')
                .where('league.id = :id', { id: leagueId })
                .getMany());
}

  findAllForLeague(league: any): Observable<Team[]>{
    return from(this.teamRepository.createQueryBuilder('team')
                .innerJoin('team.group', 'group')
                .innerJoin('group.league', 'league')
                .where('league.id = :id', { id: league.id })
                .getMany());
}

  findTeamInfo(teamId: number): Observable<any>{
    return from(this.teamRepository.createQueryBuilder('team')
                .addSelect('group.name')
                .addSelect('group.id')
                .addSelect('league.id')
                .addSelect('tournament.startDateTime')
                .addSelect('homeMatch.id')
                .addSelect('outMatch.id')
                .leftJoin('team.outMatches', 'outMatch')
                .leftJoin('team.homeMatches', 'homeMatch')
                .leftJoin('team.group', 'group')
                .leftJoin('group.league', 'league')
                .leftJoin('league.tournament', 'tournament')
                .where('team.id = :id' , {id: Number(teamId)})
                .getOne());
  }

}