import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MovieService } from '../service/movies.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @HttpCode(HttpStatus.OK)
  @Get('films')
  @UseGuards(JwtAuthGuard)
  async getFilms(): Promise<any> {
    return this.movieService.getFilms();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get(':id')
  async getMovieDetails(@Param('id') id: number) {
    return this.movieService.getMovieDetails(id);
  }
}
