import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsDate,
  IsArray,
  IsUrl,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'A New Hope',
    description: 'Título de la película',
    required: true,
  })
  title: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({
    example: 1,
    description: 'ID del episodio de la película',
    required: true,
  })
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'It is a period of civil war...',
    description: 'Texto de apertura de la película',
    required: true,
  })
  opening_crawl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'George Lucas',
    description: 'Director de la película',
    required: true,
  })
  director: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Gary Kurtz, Rick McCallum',
    description: 'Productor de la película',
    required: true,
  })
  producer: string;

  @IsDate()
  @IsNotEmpty()
  @ApiProperty({
    example: '1977-05-24',
    description: 'Fecha de estreno de la película',
    required: true,
  })
  release_date: Date;

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
    description: 'Lista de personajes de la película',
    required: false,
  })
  characters: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/planets/1/',
      'https://swapi.dev/api/planets/2/',
    ],
    description: 'Lista de planetas que aparecen en la película',
    required: false,
  })
  planets: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/starships/2/',
      'https://swapi.dev/api/starships/3/',
    ],
    description: 'Lista de naves estelares de la película',
    required: false,
  })
  starships: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/vehicles/4/',
      'https://swapi.dev/api/vehicles/6/',
    ],
    description: 'Lista de vehículos de la película',
    required: false,
  })
  vehicles: string[];

  @IsArray()
  @IsOptional()
  @ApiProperty({
    example: [
      'https://swapi.dev/api/species/1/',
      'https://swapi.dev/api/species/2/',
    ],
    description: 'Lista de especies que aparecen en la película',
    required: false,
  })
  species: string[];

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({
    example: 'http://swapi.dev/api/films/1/',
    description: 'URL de la página de la película',
    required: true,
  })
  url: string;
}
