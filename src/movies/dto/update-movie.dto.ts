import {
  IsString,
  IsInt,
  IsDate,
  IsArray,
  IsUrl,
  IsOptional,
} from 'class-validator';

export class UpdateMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsInt()
  @IsOptional()
  episode_id?: number;

  @IsString()
  @IsOptional()
  opening_crawl?: string;

  @IsString()
  @IsOptional()
  director?: string;

  @IsString()
  @IsOptional()
  producer?: string;

  @IsDate()
  @IsOptional()
  release_date?: Date;

  @IsArray()
  @IsOptional()
  characters?: string[];

  @IsArray()
  @IsOptional()
  planets?: string[];

  @IsArray()
  @IsOptional()
  starships?: string[];

  @IsArray()
  @IsOptional()
  vehicles?: string[];

  @IsArray()
  @IsOptional()
  species?: string[];

  @IsUrl()
  @IsOptional()
  url?: string;
}
