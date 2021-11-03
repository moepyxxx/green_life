import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const url = `mongodb://root:example@mongo:27017/greenlife?authSource=admin`;

@Module({
  imports: [
    MongooseModule.forRoot(url),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'image'),
    }),
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
