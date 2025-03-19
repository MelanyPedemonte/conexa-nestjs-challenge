import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './service/movies.service';
import { MovieController } from './controller/movies.controller';
import { HttpModule } from '@nestjs/axios';
import { Movie } from '../entities/movie.entity';
import { SyncMoviesService } from './service/sync-movies.service';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, SyncMoviesService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
