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
  title: string;

  @IsInt()
  @IsNotEmpty()
  episode_id: number;

  @IsString()
  @IsNotEmpty()
  opening_crawl: string;

  @IsString()
  @IsNotEmpty()
  director: string;

  @IsString()
  @IsNotEmpty()
  producer: string;

  @IsDate()
  @IsNotEmpty()
  release_date: Date;

  @IsArray()
  @IsOptional()
  characters: string[];

  @IsArray()
  @IsOptional()
  planets: string[];

  @IsArray()
  @IsOptional()
  starships: string[];

  @IsArray()
  @IsOptional()
  vehicles: string[];

  @IsArray()
  @IsOptional()
  species: string[];

  @IsUrl()
  @IsNotEmpty()
  url: string;
}
