import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';
import { Tag, TagSchema } from 'src/tags/tag.schema';
import { TagService } from 'src/tags/tag.service';
import { User, UserSchema } from 'src/users/user.schema';
import { UserService } from 'src/users/user.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Post.name, schema: PostSchema },
    { name: Tag.name, schema: TagSchema },
    { name: User.name, schema: UserSchema },
  ])],
  controllers: [PostController],
  providers: [PostService, TagService, UserService],
})
export class PostModule {}