import { JWT_TOKEN_NAME } from './../../constants';
import { AuthService } from './../../auth/auth.service';
import { Controller, Post, Req, Res, HttpStatus } from "@nestjs/common";


@Controller('login')
export class LoginController {

    constructor(private authService : AuthService){}
    
    @Post()
    login(@Req() request, @Res() response){
        const token = this.authService.createToken({user:request.locals.user, id: request.locals.user.id});
        response.cookie(JWT_TOKEN_NAME, token.accessToken, {maxAge: 1000*60*60*100} );
        response.status(HttpStatus.OK);
        response.send();
    }
}