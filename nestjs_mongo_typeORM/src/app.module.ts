import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host:'localhost',
      port: 27017,
      database: 'users',
      entities: [User],
      synchronize: true
    }),
    UsersModule] ,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
