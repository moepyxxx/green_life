import { Controller, Get } from '@nestjs/common';
import { GreenService } from './green.service';


@Controller('greens')
export class GreenController {
  
  constructor(private readonly greenService: GreenService) {}

  @Get()
  async findAll() {
    return await this.greenService.fetchAll();
  }

}
