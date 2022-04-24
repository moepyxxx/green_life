import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config'; // 追加
import { ServiceAccount } from 'firebase-admin';
import { initializeApp, cert } from 'firebase-admin/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService: ConfigService = app.get(ConfigService);

  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/g, '\n'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
  };

  initializeApp({
    credential: cert(adminConfig),
    storageBucket: configService.get<string>('FIREBASE_STORAGE_BUCKET'),
  });

  await app.listen(3001);
}
bootstrap();
