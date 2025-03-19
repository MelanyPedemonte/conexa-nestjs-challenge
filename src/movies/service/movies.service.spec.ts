import { Test, TestingModule } from '@nestjs/testing';
import { MovieService } from '../service/movies.service';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { RolesGuard } from '../../auth/roles.guard';
import { MovieController } from '../controller/movies.controller';

const mockMovie = {
  id: 1,
  title: 'A New Hope',
  episode_id: 1,
  opening_crawl: 'It is a period of civil war...',
  director: 'George Lucas',
  producer: 'Gary Kurtz, Rick McCallum',
  release_date: new Date('1977-05-25'),
  characters: [],
  planets: [],
  starships: [],
  vehicles: [],
  species: [],
  url: 'http://swapi.dev/api/films/1/',
};

const mockMovieService = {
  getFilms: jest.fn().mockResolvedValue([mockMovie]),
  getMovieDetails: jest.fn().mockResolvedValue(mockMovie),
  createMovie: jest.fn().mockResolvedValue(mockMovie),
  updateMovie: jest.fn().mockResolvedValue(mockMovie),
  deleteMovie: jest.fn().mockResolvedValue({ message: 'Movie deleted' }),
};

const mockGuard = { canActivate: jest.fn(() => true) };

describe('MovieController', () => {
  let controller: MovieController;
  let service: MovieService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
      providers: [
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<MovieController>(MovieController);
    service = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  //listado de peliculas
  it('list of movies', async () => {
    const result = await controller.getFilms();
    expect(result).toEqual([mockMovie]);
    expect(service.getFilms).toHaveBeenCalled();
  });

  //detalle de una pelicula
  it('movie detail', async () => {
    const result = await controller.getMovieDetails(1);
    expect(result).toEqual(mockMovie);
    expect(service.getMovieDetails).toHaveBeenCalledWith(1);
  });

  //alta de una pelicula
  it('create movie', async () => {
    const createMovieDto: CreateMovieDto = {
      title: 'A New Hope',
      episode_id: 1,
      opening_crawl: 'It is a period of civil war...',
      director: 'George Lucas',
      producer: 'Gary Kurtz, Rick McCallum',
      release_date: new Date('1977-05-25'),
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      url: 'http://swapi.dev/api/films/1/',
    };

    const result = await controller.createMovie(createMovieDto);
    expect(result).toEqual(mockMovie);
    expect(service.createMovie).toHaveBeenCalledWith(createMovieDto);
  });

  //update de una pelicula
  it('update movie', async () => {
    const updateMovieDto: UpdateMovieDto = { title: 'The Empire Strikes Back' };

    const result = await controller.updateMovie(1, updateMovieDto);
    expect(result).toEqual(mockMovie);
    expect(service.updateMovie).toHaveBeenCalledWith(1, updateMovieDto);
  });

  //update de una pelicula no existente
  it('update not found', async () => {
    jest
      .spyOn(service, 'updateMovie')
      .mockRejectedValueOnce(new Error('Movie not found'));

    await expect(
      controller.updateMovie(99, { title: 'New Title' }),
    ).rejects.toThrow('Movie not found');
  });

  //baja de una pelicula
  it('delete movie', async () => {
    const result = await controller.deleteMovie(1);
    expect(result).toEqual({ message: 'Movie deleted' });
    expect(service.deleteMovie).toHaveBeenCalledWith(1);
  });

  //baja de una pelicula no existente
  it('delete not found', async () => {
    jest
      .spyOn(service, 'deleteMovie')
      .mockRejectedValueOnce(new Error('Movie not found'));

    await expect(controller.deleteMovie(99)).rejects.toThrow('Movie not found');
  });
});
