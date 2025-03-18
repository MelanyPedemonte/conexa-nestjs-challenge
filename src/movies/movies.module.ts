import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieService } from './service/movies.service';
import { MovieController } from './controller/movies.controller';
import { HttpModule } from '@nestjs/axios';
import { Movie } from 'src/entities/movie.entity';

@Module({
  imports: [HttpModule, TypeOrmModule.forFeature([Movie])],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
