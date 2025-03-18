import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService) {}

  async getFilms(): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get('https://swapi.dev/api/films/'),
    );
    return response.data;
  }

  async getMovieDetails(movieId: number): Promise<any> {
    try {
      const url = `https://swapi.dev/api/films/${movieId}/`;
      const response = await firstValueFrom(this.httpService.get(url));
      return response.data;
    } catch (error) {
      throw new HttpException('Película no encontrada', HttpStatus.NOT_FOUND);
    }
  }
}
