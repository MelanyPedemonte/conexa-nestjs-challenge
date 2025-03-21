import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
  Request,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { MovieService } from '../service/movies.service';
import { JwtAuthGuard } from '../../auth/jwt.auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { CreateMovieDto } from '../dto/create-movie.dto';
import { UpdateMovieDto } from '../dto/update-movie.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SyncMoviesService } from '../service/sync-movies.service';

@ApiTags('Películas')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieService: MovieService,
    private readonly syncMoviesService: SyncMoviesService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get('sync')
  @ApiOperation({
    summary: 'Sincronizar películas desde la API',
  })
  @ApiResponse({
    status: 200,
    description: 'Películas sincronizadas exitosamente',
  })
  @ApiResponse({ status: 500, description: 'Error en la sincronización' })
  async syncMovies() {
    await this.syncMoviesService.syncMoviesFromApi();
    return { message: 'Películas sincronizadas exitosamente' };
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obtener la lista de películas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de películas obtenida exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBearerAuth()
  async getFilms(): Promise<any> {
    return this.movieService.getFilms();
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get(':id')
  @ApiOperation({
    summary: 'Obtener detalles de una película (Solo usuarios regulares)',
  })
  @ApiResponse({
    status: 200,
    description: 'Detalles de la película obtenidos exitosamente',
  })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  @ApiBearerAuth()
  async getMovieDetails(@Param('id') id: number) {
    return this.movieService.getMovieDetails(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Crear una nueva película (Solo administradores)' })
  @ApiResponse({ status: 201, description: 'Película creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiBearerAuth()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(createMovieDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({
    summary: 'Actualizar una película existente (Solo administradores)',
  })
  @ApiResponse({
    status: 200,
    description: 'Película actualizada exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  @ApiBearerAuth()
  async updateMovie(
    @Param('id') id: number,
    @Body() updateMovieDto: UpdateMovieDto,
  ) {
    return this.movieService.updateMovie(id, updateMovieDto);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Eliminar una película (Solo administradores)' })
  @ApiResponse({ status: 200, description: 'Película eliminada exitosamente' })
  @ApiResponse({ status: 403, description: 'Acceso prohibido' })
  @ApiResponse({ status: 404, description: 'Película no encontrada' })
  @ApiBearerAuth()
  async deleteMovie(@Param('id') id: number) {
    return this.movieService.deleteMovie(id);
  }
}
