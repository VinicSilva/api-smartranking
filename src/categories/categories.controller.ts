import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoriesService } from './categories.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './interfaces/category.interface';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  async consultarCategorias(): Promise<Array<Category>> {
    return this.categoriesService.getAll();
  }

  @Get('/:category')
  async consultarCategoriaPeloId(
    @Param('category') category: string,
  ): Promise<Category> {
    return this.categoriesService.getById(category);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async atualizarCategoria(
    @Body() atualizarCategoriaDto: UpdateCategoryDto,
    @Param('category') categoria: string,
  ): Promise<void> {
    await this.categoriesService.update(categoria, atualizarCategoriaDto);
  }

  @Post('/:category/jogadores/:playerId')
  async atribuirCategoriaJogador(@Param() params: string[]): Promise<void> {
    return this.categoriesService.joinCategoriesPlayers(params);
  }
}
