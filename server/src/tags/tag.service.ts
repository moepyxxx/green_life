import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tag as ModelTag, Tag, TagDocument } from 'src/tags/tag.schema';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(ModelTag.name) private tagModel: Model<TagDocument>,
  ) {}

  async fetchAll(): Promise<Tag[]> {
    return await this.tagModel.find().limit(50).exec();
  }

  async fetchTag(tagId: string): Promise<Tag> {
    return await this.tagModel.findById(tagId).exec();
  }
}
