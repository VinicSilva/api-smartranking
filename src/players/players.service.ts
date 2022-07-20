import { CreatePlayerDto } from './dto/create-player.dto';
import { Injectable, Logger } from '@nestjs/common';
import { Player } from './interfaces/player.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayersService {
  private players: Player[] = [];
  private readonly logger = new Logger(PlayersService.name);
  async createOrUpdatePlayer(createPlayerDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`player : ${createPlayerDto}`);
    const { email } = createPlayerDto;

    let playerFound = this.players.find((player) => player.email === email);
    this.create(createPlayerDto);
  }

  private create(createPlayerDto: CreatePlayerDto) {
    const { name, email, phoneNumber } = createPlayerDto;
    const player: Player = {
      _id: uuidv4(),
      name,
      email,
      phoneNumber,
      ranking: 'A',
      rankingPosition: 1,
      playerUrlPhoto: 'any_url',
    };
    this.players.push(player);
  }

  public get() {
    return this.players;
  }
}
