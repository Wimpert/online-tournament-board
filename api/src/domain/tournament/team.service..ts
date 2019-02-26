import { Team } from './../entities/team.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) {}

  save(team: any): Observable<any> {
    return from(this.teamRepository.save(team));
  }

  remove(team: any): Observable<any> {
    return from(this.teamRepository.delete(team));
  }

}