import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PostModule } from './posts/post.module';
import { ImageModule } from './images/image.module';
import { TagModule } from './tags/tag.module';
import { GreenModule } from './greens/green.module';
import { UserModule } from './users/user.module';
import { OyuzuriModule } from './oyuzuris/oyuzuri.module';

const url = `mongodb://root:example@mongo:27017/greenlife?authSource=admin`;

@Module({
  imports: [
    MongooseModule.forRoot(url),
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'image'),
    }),
    PostModule,
    ImageModule,
    TagModule,
    GreenModule,
    UserModule,
    OyuzuriModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
