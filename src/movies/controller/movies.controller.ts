import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MovieService } from '../service/movies.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @HttpCode(HttpStatus.OK)
  @Get('films')
  @UseGuards(JwtAuthGuard)
  async getFilms(): Promise<any> {
    return this.movieService.getFilms();
  }
}
