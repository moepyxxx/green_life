import { Model } from 'mongoose';
import { Injectable, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { IPost } from 'src/posts/interfaces/post';
import { IFindSummaryAllRequest } from './posts.controller';

export interface IfindSummaryAllResult {
  page: number,
  posts: IPost[]
}

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async findSummaryAll(request: IFindSummaryAllRequest): Promise<IfindSummaryAllResult> {

    const castParam = {
      page: Number(request.page),
      count: Number(request.count)
    }
    const results = await this.postModel.find().limit(castParam.count);

    const posts = results.map(result => {
      const { id, imagePath } = result;
      return { id, imagePath };
    });

    return {
      page: castParam.page,
      posts
    }
  }

}
