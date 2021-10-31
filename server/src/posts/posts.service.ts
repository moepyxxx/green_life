import { Injectable } from '@nestjs/common';
import { IPost } from 'src/interfaces/post';

interface IGetPostsRes {
  current: number,
  posts: IPost[]
}

@Injectable()
export class PostsService {
  
  getPosts(page: number): IGetPostsRes {
    return {
      current: page ? page + 1 : 0,
      posts: [{
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_1.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_2.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_3.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_4.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_5.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_6.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_7.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_1.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_2.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_3.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_4.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_5.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_6.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_7.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_1.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_2.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_3.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_4.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_5.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_6.jpg',
      }, {
        id: Math.random().toString(32).substring(2),
        image_path: 'sample_7.jpg',
      }]
    }
  }

}
