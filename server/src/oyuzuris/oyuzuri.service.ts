import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { UserService } from 'src/users/user.service';
import { ICreate } from './interfaces/create';
import { Oyuzuri, OyuzuriDocument } from './oyuzuri.schema';

@Injectable()
export class OyuzuriService {

  constructor(
    @InjectModel(Oyuzuri.name) private oyuzuriModel: Model<OyuzuriDocument>,
    private readonly userService: UserService,
  ) {}

  async findByPostId(postId: Schema.Types.ObjectId): Promise<Oyuzuri> {
    return this.oyuzuriModel.findOne({ postId }).exec()
  }

  async create(post: ICreate): Promise<{ oyuzuri: Oyuzuri }> {

    try {
      const _id = new Types.ObjectId;
      const oyuzuri = await new this.oyuzuriModel({
        ...post,
        _id
      });

      await oyuzuri.save();
      
      return { oyuzuri };
    } catch(error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async request(id: string, uId: string) {
    const user = await this.userService.fetchUserFromFirebaseUId(uId);

    try {
      await this.oyuzuriModel.updateOne(
        { _id: id }, 
        {
        $push: {
          requestUsers: user._id
        }
      });
    } catch(e) {
      console.log(e)
    }

  }

}