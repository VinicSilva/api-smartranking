import { PlayersService } from './players.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createOrUpdatePlayer(@Body() playerDto: CreatePlayerDto) {
    const { email } = playerDto;
    await this.playersService.createOrUpdatePlayer(playerDto);
  }

  @Get()
  async getPlayers() {
    return this.playersService.get();
  }
}
