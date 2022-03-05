import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GreenController } from './green.controller';
import { Green, GreenSchema } from './green.schema';
import { GreenService } from './green.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Green.name, schema: GreenSchema }
  ])],
  controllers: [GreenController],
  providers: [GreenService],
})
export class GreenModule {}