import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from 'src/entities/movie.entity';
import { Repository } from 'typeorm';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    private httpService: HttpService,
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  //Obtiene el listado de peliculas
  async getFilms(): Promise<any> {
    try {
      return await this.movieRepository.find();
    } catch (error) {
      throw new Error(`No se pudieron obtener las peliculas: ${error.message}`);
    }
  }

  //Obtiene el detalle de una pelicula
  async getMovieDetails(id: number): Promise<any> {
    try {
      return await this.movieRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(
        `No se pudo obtener el detalle de la pelicula: ${error.message}`,
      );
    }
  }

  //Alta de una pelicula
  async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
    try {
      const newMovie = this.movieRepository.create(createMovieDto);
      return await this.movieRepository.save(newMovie);
    } catch (error) {
      throw new Error(`No se pudo crear la pelicula: ${error.message}`);
    }
  }

  //Actualizacion de una pelicula
  async updateMovie(
    id: number,
    updateMovieDto: UpdateMovieDto,
  ): Promise<Movie> {
    try {
      const movie = await this.movieRepository.findOne({ where: { id } });

      if (!movie) {
        throw new Error('Movie not found');
      }

      const updatedMovie = { ...movie };

      for (const key in updateMovieDto) {
        if (updateMovieDto[key] !== movie[key]) {
          updatedMovie[key] = updateMovieDto[key];
        }
      }

      return await this.movieRepository.save(updatedMovie);
    } catch (error) {
      throw new Error(`No se pudo actualizar la película: ${error.message}`);
    }
  }

  //Baja de una pelicula
  async deleteMovie(id: number): Promise<void> {
    try {
      const movie = await this.movieRepository.findOne({ where: { id } });
      if (!movie) {
        throw new Error('Movie not found');
      }

      await this.movieRepository.remove(movie);
    } catch (error) {
      throw new Error(`Error al eliminar la película: ${error.message}`);
    }
  }
}
