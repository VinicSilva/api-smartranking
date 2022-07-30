import { CreatePlayerDto } from './dto/create-player.dto';
import {
  Injectable,
  Logger,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (playerFound) {
      throw new BadRequestException(`Player already exists!`);
    }
    const playerCreated = new this.playerModel(createPlayerDto);
    return playerCreated.save();
  }

  async update(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player not found!`);
    }
    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: updatePlayerDto })
      .exec();
  }

  public get() {
    return this.playerModel.find().exec();
  }

  public async getById(_id: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player not found`);
    }
    return playerFound;
  }

  async delete(_id: string): Promise<any> {
    const playerFound = await this.playerModel.findOne({ _id }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player not found`);
    }
    return this.playerModel.deleteOne({ _id }).exec();
  }
}
