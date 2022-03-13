import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, Subscription } from 'rxjs';
import { UserService } from './user.service';
import { IAuth } from './interface/auth';
import { ISigninResult } from './interface/signinResult';
import { IFirstUserInfo } from './interface/firstUserInfo';
import { User } from './user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() request: IAuth & IFirstUserInfo): Promise<{ user: User }> {
    const auth: IAuth = {
      email: request.email,
      password: request.password
    }
    const first: IFirstUserInfo = {
      displayName: request.displayName
    }
    
    return this.userService.signup(auth, first);
  }

  @Post('signin')
  signin(@Body() request: IAuth): Observable<AxiosResponse<ISigninResult>> {
    return this.userService.signin(request);
  }

  @Get('thumbnail')
  async findThumbnail(@Headers("Authorization") authorization: string) {

    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(authorization.replace('Bearer ', ''));
      if (isAuthed) {
        return await this.userService.findThumbnail(isAuthed);
      }
    }catch(e) {
      throw new HttpException("this accoun is not authed", HttpStatus.UNAUTHORIZED);
    }
  }

}
