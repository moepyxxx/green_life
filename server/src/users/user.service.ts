import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { IAuth } from './interface/auth';
import { ISigninResult } from './interface/signinResult';
import { map, catchError } from 'rxjs/operators';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User as ModelUser, User, UserDocument } from './user.schema';
import { IFirstUserInfo } from './interface/firstUserInfo';
import { ICreateUser } from './interface/createUser';

@Injectable()
export class UserService {

  signupUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.FIREBASE_API_KEY}`;
  signinUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`;

  constructor(
    private httpService: HttpService,
    @InjectModel(ModelUser.name) private userModel: Model<UserDocument>
  ) {}

  async signup(authRequest: IAuth, firstUserInfo: IFirstUserInfo): Promise<{ user: User }> {
    return this.httpService.post(
      this.signupUrl,
      { ...authRequest, returnSecureToken: true }
    ).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      }),
    )
    .toPromise()
    .then(async data => {
      return await this.createUser(data.email, data.localId, firstUserInfo);
    })
  }

  signin(request: IAuth): Observable<AxiosResponse<ISigninResult>> {

    return this.httpService.post(
      this.signinUrl,
      { ...request, returnSecureToken: true }
    ).pipe(
      map(response => response.data),
      catchError(e => {
        throw new HttpException(e.response.data, e.response.status);
      })
    );

  }

  async verifyIdToken(idToken: string): Promise<string | false> {
    const decorded:DecodedIdToken = await admin.auth().verifyIdToken(idToken);
    return decorded.uid ? decorded.uid : false;
  }

  async createUser(email: string, localId: string, firstUserInfo: IFirstUserInfo): Promise<{ user: User }> {
    try {
      const _id = new Types.ObjectId;
      const user: ICreateUser = {
        firebaseUid: localId,
        userName: _id.toString(),
        displayName: firstUserInfo.displayName,
        email
      }
      const createUser = await new this.userModel({ ...user, _id });
      await createUser.save();

      return {
        user: createUser
      }
    } catch(error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async fetchUserFromObjectId(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async fetchUser(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }
  
  async fetchUserFromFirebaseUId(uId: string): Promise<User> {
    return await this.userModel.findOne({ firebaseUid: uId }).exec();
  }

  async findThumbnail(uId: string): Promise<{ thumbnailUrl: string }> | never {
    const user = await this.fetchUserFromFirebaseUId(uId);
    return {
      thumbnailUrl: user.thumbnailUrl
    }
  }
}
