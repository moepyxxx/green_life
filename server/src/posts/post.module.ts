import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';
import { Tag, TagSchema } from 'src/tags/tag.schema';
import { TagService } from 'src/tags/tag.service';
import { User, UserSchema } from 'src/users/user.schema';
import { GreenService } from 'src/greens/green.service';
import { Green, GreenSchema } from 'src/greens/green.schema';
import { UserService } from 'src/users/user.service';
import { HttpModule } from '@nestjs/axios';
import { Oyuzuri, OyuzuriSchema } from 'src/oyuzuris/oyuzuri.schema';
import { OyuzuriService } from 'src/oyuzuris/oyuzuri.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Tag.name, schema: TagSchema },
      { name: User.name, schema: UserSchema },
      { name: Green.name, schema: GreenSchema },
      { name: Oyuzuri.name, schema: OyuzuriSchema }
    ]),
    HttpModule
  ],
  controllers: [PostController],
  providers: [PostService, TagService, UserService, GreenService, UserService, OyuzuriService],
})
export class PostModule {}