import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IAuth } from './interface/auth';
import { ISigninResult } from './interface/signinResult';
import { ISignupResult } from './interface/signupResult';

@Injectable()
export class AuthService {

  signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
  signinUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

  constructor(private httpService: HttpService) {}

  signup(request: IAuth): Observable<AxiosResponse<ISignupResult>> {
    return this.httpService.post(
      this.signupUrl,
      { ...request, returnSecureToken: true }
    );
  }

  signin(request: IAuth): Observable<AxiosResponse<ISigninResult>> {
    return this.httpService.post(
      this.signupUrl,
      { ...request, returnSecureToken: true }
    );
  }

  async verifyIdToken(idToken: string): Promise<boolean> {
    const decorded:DecodedIdToken = await admin.auth().verifyIdToken(idToken);
    return decorded.uid ? true : false;
  }
}
