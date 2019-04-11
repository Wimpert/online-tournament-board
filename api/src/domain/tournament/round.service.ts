import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Round } from '../entities/round.entity';

@Injectable()
export class RoundService {
  constructor(
    @InjectRepository(Round)
    private readonly roundRepository: Repository<Round>,
  ) {}

  save(round: any): Observable<any> {
    return from(this.roundRepository.save(round));
  }

  delete(round: any): Observable<any> {
    return from(this.roundRepository.delete(round));
  }

  findOne(round: any): Observable<Round> {
    return from(this.roundRepository.findOne(round));
  }
}