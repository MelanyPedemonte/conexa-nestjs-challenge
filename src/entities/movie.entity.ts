import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies')
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ type: 'int' })
  episode_id: number;

  @Column('text')
  opening_crawl: string;

  @Column({ length: 255 })
  director: string;

  @Column({ length: 255 })
  producer: string;

  @Column({ type: 'date' })
  release_date: Date;

  @Column('simple-array')
  characters: string[];

  @Column('simple-array')
  planets: string[];

  @Column('simple-array')
  starships: string[];

  @Column('simple-array')
  vehicles: string[];

  @Column('simple-array')
  species: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  edited: Date;

  @Column({ length: 255 })
  url: string;
}
