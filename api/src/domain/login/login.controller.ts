import { tap, filter, map } from 'rxjs/operators';
import { Controller, Post, Body } from "@nestjs/common";
import { Observable, of } from "rxjs";
import { JwtPayload } from "auth/interfaces/jwt-payload.interface";
import { userInfo } from "os";
import { UserService } from "domain/user/user.service";
import * as bcrypt from 'bcrypt';
import { User } from 'domain/user/user.entity';

@Controller('login')
export class LoginController {

    constructor(private readonly userService: UserService){}
    
    @Post()
    login(@Body() credentials : {username:string, password: string}): Observable<{loggedIn:boolean, jwt: JwtPayload}>{
        return this.userService.findOne({username: credentials.username,}).pipe(
            tap(console.log),
            filter((user:User) => {
                return bcrypt.compareSync(credentials.password, user.password);
            }),
            map(_ => true)
        );
    }
}