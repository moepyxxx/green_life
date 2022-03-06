import { Body, Controller, Post } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { IAuth } from './interface/auth';
import { ISigninResult } from './interface/signinResult';
import { ISignupResult } from './interface/signupResult';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() request: IAuth): Observable<AxiosResponse<ISignupResult>> {
    return this.authService.signup(request);
  }

  @Post('signin')
  signin(@Body() request: IAuth): Observable<AxiosResponse<ISigninResult>> {
    return this.authService.signin(request);
  }
}
