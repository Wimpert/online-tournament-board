import { Injectable, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { from, Observable } from 'rxjs';
import { Group } from 'domain/entities/group.entity';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  save(group: any): Observable<any> {
    return from(this.groupRepository.save(group));
  }

  delete(group: any): Observable<any> {
    return from(this.groupRepository.delete(group));
  }
}