import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useStaticAssets(join(__dirname, '..','..','frontend', 'dist'));
  app.setGlobalPrefix('api');
  app.enableCors({origin: ['http://localhost:8080', 'http://localhost:4200', 'http://www.dejackies.be'], credentials: true});
  await app.listen(3000);
}
bootstrap();
