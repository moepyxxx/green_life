import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './post.schema';
import { IPost } from 'src/interfaces/post';

interface IGetPostsRes {
  current: number,
  posts: IPost[]
}

interface ITestPost {
  imagePath: string;
  comment: string;
}

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(testPost: ITestPost): Promise<Post> {
    const createdPost = new this.postModel(testPost);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  getPosts(page: number): IGetPostsRes {
    return {
      current: page ? page + 1 : 0,
      posts: [{
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_1.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_2.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_3.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_4.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_5.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_6.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_7.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_1.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_2.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_3.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_4.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_5.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_6.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_7.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_1.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_2.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_3.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_4.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_5.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_6.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        imagePath: 'sample_7.jpg',
      }]
    }
  }

}
