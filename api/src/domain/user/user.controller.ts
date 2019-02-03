import { JwtPayload } from './../../auth/interfaces/jwt-payload.interface';
import { AuthService } from './../../auth/auth.service';
import { UserService } from './user.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  HttpStatus,
  HttpException,
  Res
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User } from '../entities/user.entity';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService : AuthService) {}

  @Post()
  createUser(@Body() user?: User): Observable<any>{

    return this.userService.save(user).pipe(
      map( user => {return {email: user.email, id: user.id};}),
      map( (payload: JwtPayload) => {
        return this.authService.createToken(payload);
      }));
  }

  @Put()
  update(@Body() user?: User): Observable<User> {
    return this.userService.save(user);
  }
  

  @Get(':id')
  findOne(@Param() id: number): Observable<{}> {
    return this.userService.findOne({id: id}).pipe(
      map(user => {
        if (user === undefined) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return {... user, password:''};
      }),
    );;
  }
  
}
