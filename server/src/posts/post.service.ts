import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { IPostSummary, PostSummaryMaker } from 'src/posts/interfaces/postSummery';
import { IPostDetail, PostDetailMaker } from 'src/posts/interfaces/postDetail';
import { IFindSummaryAllRequest } from './post.controller';
import { TagService } from 'src/tags/tag.service';
import { UserService } from 'src/users/user.service';
import { GreenService } from 'src/greens/green.service';
import { Tag } from 'src/tags/tag.schema';
import { User } from 'src/users/user.schema';
import { IPin } from './interfaces/pin';
import { Green } from 'src/greens/green.schema';

export interface IfindSummaryAllResult {
  page: number,
  posts: IPostSummary[]
}

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly tagService: TagService,
    private readonly userService: UserService,
    private readonly greenService: GreenService
  ) {}

  async findSummaryAll(request: IFindSummaryAllRequest): Promise<IfindSummaryAllResult> {

    const param = {
      page: Number(request.page),
      count: Number(request.count)
    }
    const results = await this.postModel.find().limit(param.count);

    const posts: IPostSummary[] = results.map(result => {
      return new PostSummaryMaker(result);
      ;
    });

    return {
      page: param.page,
      posts
    }
  }

  async findOne(id: string): Promise<IPostDetail> {
    const post: Post = await this.postModel.findById(id).exec();

    const greenpins: IPin[] = await Promise.all(post.pins.map(async post => {
      const green: Green = await this.greenService.fetchGreen(post.greenId.toString());
      return {
        position: post.position,
        green
      }
    }))

    const user: User = await this.userService.fetchUser(post.userId.toString());
    const tags: Tag[] = await Promise.all(post.tagIds.map(async tagId => {
      return await this.tagService.fetchTag(tagId.toString());
    }))

    return new PostDetailMaker(post, tags, user, greenpins);
  }

}
