import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User as ModelUser, User, UserDocument } from 'src/users/user.schema';

@Injectable()
export class UserService {

  constructor( @InjectModel(ModelUser.name) private userModel: Model<UserDocument> ) {}

  async fetchUser(userId: string): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }
}