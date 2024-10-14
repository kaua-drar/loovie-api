import { Controller, Post } from '@nestjs/common';
import { GenresRepository } from './genres.repository';
import { Genre } from './genre';

@Controller('genres')
export class GenresController {
  constructor(private genresRepository: GenresRepository) {}

  @Post()
  async create() {
    const genre = await this.genresRepository.create(
      new Genre({ tmdbId: 1337 }),
    );

    return genre;
  }
}
