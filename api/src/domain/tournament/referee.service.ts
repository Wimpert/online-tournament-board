
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Referee } from '../entities/referee.entity';

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