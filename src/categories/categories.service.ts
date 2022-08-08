import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
    private readonly playersService: PlayersService,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;
    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    if (!categoryFound) {
      throw new BadRequestException(`Category ${category} already registered.`);
    }
    const categorySaved = new this.categoryModel(createCategoryDto);
    return categorySaved.save();
  }

  async getAll(): Promise<Array<Category>> {
    return this.categoryModel.find().populate('players').exec();
  }

  async getById(category: string): Promise<Category> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    if (!categoryFound) {
      throw new NotFoundException(`Category ${category} not found.`);
    }
    return categoryFound;
  }

  async update(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    if (!categoryFound) {
      throw new NotFoundException(`Category ${category} not found.`);
    }
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: updateCategoryDto })
      .exec();
  }

  async joinCategoriesPlayers(params: string[]): Promise<void> {
    const category = params['category'];
    const playerId = params['playerId'];
    const categoryFound = await this.categoryModel.findOne({ category }).exec();
    const playerSavedInCategory = await this.categoryModel
      .find({ category })
      .where('players')
      .in(playerId)
      .exec();
    if (!categoryFound) {
      throw new BadRequestException(`Category ${category} not found.`);
    }
    if (playerSavedInCategory.length > 0) {
      throw new BadRequestException(
        `Player ${playerId} saved in category ${category}.`,
      );
    }

    categoryFound.players.push(playerId);
    await this.categoryModel
      .findOneAndUpdate({ category }, { $set: categoryFound })
      .exec();
  }
}
