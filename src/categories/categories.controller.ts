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
  async getCategories(): Promise<Array<Category>> {
    return this.categoriesService.getAll();
  }

  @Get('/:category')
  async getCategoryById(
    @Param('category') category: string,
  ): Promise<Category> {
    return this.categoriesService.getById(category);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('category') category: string,
  ): Promise<void> {
    await this.categoriesService.update(category, updateCategoryDto);
  }

  @Post('/:category/player/:playerId')
  async joinCategoryPlayer(@Param() params: string[]): Promise<void> {
    return this.categoriesService.joinCategoriesPlayers(params);
  }
}
