import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/users.module';
import { User } from './entities/user.entity';
import { MovieModule } from './movies/movies.module';
import { Movie } from './entities/movie.entity';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().default(5432),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT || '5432'),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      ssl:
        process.env.NODE_ENV !== 'development'
          ? { rejectUnauthorized: false }
          : false,
      entities: [User, Movie],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    MovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
