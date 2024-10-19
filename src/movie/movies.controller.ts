import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  SerializeOptions,
  UseInterceptors,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieSearchResponseSerializer } from './movie.search.serializer';

@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ type: MovieSearchResponseSerializer })
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async search(
    @Body('query') query: string,
    @Body('page') page: number,
    @Body('per_page') perPage: number,
    @Body('sort_by') sortBy: string,
    @Body('sort_direction') sortDirection: 'asc' | 'desc',
    @Headers('accept-language') language: string,
  ) {
    const search = await this.moviesService.search({
      query,
      language,
      page,
      perPage,
      sortBy,
      sortDirection,
    });

    return search;
  }
}
