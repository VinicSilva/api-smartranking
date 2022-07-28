import { CreatePlayerDto } from './dto/create-player.dto';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private readonly playerModel: Model<Player>,
  ) {}

  private readonly logger = new Logger(PlayersService.name);

  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayerDto;
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (playerFound) {
      this.update(createPlayerDto);
    } else {
      this.create(createPlayerDto);
    }
  }

  public get() {
    return this.playerModel.find().exec();
  }

  public async getByEmail(email: string): Promise<Player> {
    const playerFound = await this.playerModel.findOne({ email }).exec();
    if (!playerFound) {
      throw new NotFoundException(`Player with e-mail: ${email} not found`);
    }
    return playerFound;
  }

  async deletePlayer(email: string): Promise<any> {
    return this.playerModel.remove({ email }).exec();
  }

  private create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const playerCreated = new this.playerModel(createPlayerDto);
    return playerCreated.save();
  }

  private update(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const { email } = createPlayerDto;
    return this.playerModel
      .findOneAndUpdate({ email }, { $set: createPlayerDto })
      .exec();
  }
}
