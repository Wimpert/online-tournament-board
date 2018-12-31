import { UserService } from './user.service';
import {
  Controller,
  HttpStatus,
  HttpException,
  Post,
  Body,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user?: User): Observable<User> {
    return this.userService.save(user);
  }

  @Put()
  update(@Body() user?: User): Observable<User> {
    return this.userService.save(user);
  }

  @Get(':id')
  findOne(@Param() id: number): Observable<User> {
    return this.userService.findOne(id).pipe(
      map(tournament => {
        if (tournament === undefined) {
          throw new HttpException('Tournament not found', HttpStatus.NOT_FOUND);
        }
        return tournament;
      }),
    );
  }
}
