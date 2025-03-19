import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Movie } from '../../entities/movie.entity';

@Injectable()
export class SyncMoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  //Cron que sincroniza las peliculas una vez al dia a las 00:00hs
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async syncMoviesFromApi() {
    try {
      const response = await axios.get('https://swapi.dev/api/films/');
      const movies = response.data.results;

      for (const movie of movies) {
        const existingMovie = await this.movieRepository.findOne({
          where: { episode_id: movie.episode_id },
        });

        if (!existingMovie) {
          const newMovie = this.movieRepository.create({
            title: movie.title,
            episode_id: movie.episode_id,
            opening_crawl: movie.opening_crawl,
            director: movie.director,
            producer: movie.producer,
            release_date: new Date(movie.release_date),
            characters: movie.characters,
            planets: movie.planets,
            starships: movie.starships,
            vehicles: movie.vehicles,
            species: movie.species,
            url: movie.url,
          });

          await this.movieRepository.save(newMovie);
        } else {
          existingMovie.title = movie.title;
          existingMovie.opening_crawl = movie.opening_crawl;
          existingMovie.director = movie.director;
          existingMovie.producer = movie.producer;
          existingMovie.release_date = new Date(movie.release_date);
          existingMovie.characters = movie.characters;
          existingMovie.planets = movie.planets;
          existingMovie.starships = movie.starships;
          existingMovie.vehicles = movie.vehicles;
          existingMovie.species = movie.species;

          await this.movieRepository.save(existingMovie);
        }
      }

      console.log('Peliculas sincronizadas');
    } catch (error) {
      console.error('Error al sincronizar las peliculas:', error.message);
    }
  }
}
