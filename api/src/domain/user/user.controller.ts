import { UserService } from './user.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
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
  
  @Get('test')
  test(): Observable<string> {
    return  of("hello world");
  }

  @Get(':id')
  findOne(@Param() id: number): Observable<User> {
    return this.userService.findOne(id);
  }
  
}
