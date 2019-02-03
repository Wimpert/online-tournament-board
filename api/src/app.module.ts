import { LoginController } from './domain/login/login.controller';
import { LoginMiddleware } from './domain/login/login.middleware';
import { JwtStrategy } from './auth/jwt.strategy';
import { AuthMiddleware } from './auth/auth.middleware';
import { PassportModule } from '@nestjs/passport';
import { DomainModule } from './domain/domain.module';
import { AuthModule } from './auth/auth.module';
import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CookieParserMiddleware } from '@nest-middlewares/cookie-parser';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
      logging: true
    }),
    DomainModule
  ],
})
export class AppModule implements NestModule {
  configure(consumer : MiddlewareConsumer){
    consumer.apply(CookieParserMiddleware).forRoutes(
      { path: '*', method: RequestMethod.ALL }
    ).apply(AuthMiddleware)
    .forRoutes(
      { path: '*', method: RequestMethod.ALL }
    );
}
}
