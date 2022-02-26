import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { IPost } from 'src/posts/interfaces/post';
import { IPostDetail, PostDetailMaker } from 'src/posts/interfaces/postDetail';
import { IFindSummaryAllRequest } from './post.controller';
import { TagService } from 'src/tags/tag.service';
import { UserService } from 'src/users/user.service';
import { Tag } from 'src/tags/tag.schema';
import { User } from 'src/users/user.schema';

export interface IfindSummaryAllResult {
  page: number,
  posts: IPost[]
}

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
  ) {}

  async findSummaryAll(request: IFindSummaryAllRequest): Promise<IfindSummaryAllResult> {

    const param = {
      page: Number(request.page),
      count: Number(request.count)
    }
    const results = await this.postModel.find().limit(param.count);

    const posts: IPost[] = results.map(result => {
      const { id, imagePath } = result;
      return { id, imagePath };
    });

    return {
      page: param.page,
      posts
    }
  }

  async findOne(id: string): Promise<IPostDetail> {
    const post: Post = await this.postModel.findById(id).exec();
    const user: User = await this.userService.fetchUser(post.userId.toString());
    console.log(post.tagIds);
    const tags: Tag[] = await Promise.all(post.tagIds.map(async tagId => {
      console.log(tagId)
      console.log(tagId.toString())
      return await this.tagService.fetchTag(tagId.toString());
    }))
    return new PostDetailMaker(post, tags, user);
  }

}
