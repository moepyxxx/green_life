import { Body, Controller, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { IAuth } from './interface/auth';
import { ISigninResult } from './interface/signinResult';
import { ISignupResult } from './interface/signupResult';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('signup')
  signup(@Body() request: IAuth): Observable<AxiosResponse<ISignupResult>> {
    return this.appService.signup(request);
  }

  @Post('signin')
  signin(@Body() request: IAuth): Observable<AxiosResponse<ISigninResult>> {
    return this.appService.signin(request);
  }
}
