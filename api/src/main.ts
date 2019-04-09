import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors({ origin: ['http://localhost:8080', 'http://localhost:4200', 'http://www.dejackies.be', 'http://www.dejackies.be/tornooi'], credentials: true  });
  // app.use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*, http://localhost:4200');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   next();
  // });
  await app.listen(3000);
}
bootstrap();
