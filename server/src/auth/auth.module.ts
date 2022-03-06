import { Module } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    HttpModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}