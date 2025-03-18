import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  constructor(private httpService: HttpService) {}

  async getFilms(): Promise<any> {
    const response = await lastValueFrom(
      this.httpService.get('https://swapi.dev/api/films/'),
    );
    return response.data;
  }
}
