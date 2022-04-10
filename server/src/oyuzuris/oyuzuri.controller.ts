import { Controller, Param, Post, Headers, HttpException, HttpStatus, Get, Body } from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { OyuzuriService } from './oyuzuri.service';

@Controller('oyuzuris')
export class OyuzuriController {
  
  constructor(
    private readonly oyuzuriService: OyuzuriService,
    private readonly userService: UserService
  ) {}

  @Post(':id/request')
  async request(
    @Headers("Authorization") authorization: string,
    @Param('id') id : string,
    @Body() request: {
      message: string
    }
  ) : Promise<boolean> {
    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(authorization.replace('Bearer ', ''));
      if (isAuthed) {
        return await this.oyuzuriService.request(id, isAuthed, request);
      }
    }catch(e) {
      throw new HttpException("this accoun is not authed", HttpStatus.UNAUTHORIZED);
    }
  }

  @Post(':id/cancel')
  async cancel(
    @Headers("Authorization") authorization: string,
    @Param('id') id : string
  ) : Promise<boolean> {
    try {
      // なんかないのかな…あると思うけど…
      const isAuthed: string | false = await this.userService.verifyIdToken(authorization.replace('Bearer ', ''));
      if (isAuthed) {
        return await this.oyuzuriService.cancel(id, isAuthed);
      }
    }catch(e) {
      throw new HttpException("this accoun is not authed", HttpStatus.UNAUTHORIZED);
    }
  }
  
}
