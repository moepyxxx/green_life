import { Body, Controller, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { IAuth } from './interface/auth';
import { ISigninResult } from './interface/signinResult';
import { ISignupResult } from './interface/signupResult';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  signup(@Body() request: IAuth): Observable<AxiosResponse<ISignupResult>> {
    return this.userService.signup(request);
  }

  @Post('signin')
  signin(@Body() request: IAuth): Observable<AxiosResponse<ISigninResult>> {
    return this.userService.signin(request);
  }
}
