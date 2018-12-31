import { DomainModule } from './domain/domain.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'tournament-board',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
  }), DomainModule],
})
export class AppModule {}
