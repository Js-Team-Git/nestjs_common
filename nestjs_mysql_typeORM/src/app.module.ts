import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [

    ////PostgreSQL DB Congiguration////

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'root123',
    //   database: 'users',
    //   entities: [User],
    //   synchronize: true
    // }),

    ////MySQL DB Configuration////
    
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      // host: 'host.docker.internal',
      port: 3306,
      username: 'root',
      password: 'root123',
      database: 'users',
      entities: [User],
      synchronize: true
    }),

    ////MSSQL DB Configuration////

    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'localhost',
    //   port: 1433,
    //   username: 'sa',
    //   password: 'int123$%^',
    //   database: 'users',
    //   entities: [User],
    //   synchronize: true,
    //   extra: {
    //     trustServerCertificate: true,
    //   }
    // }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
