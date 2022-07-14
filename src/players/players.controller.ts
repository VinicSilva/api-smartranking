import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

@Controller('api/v1/players')
export class PlayersController {
  @Post()
  async createOrUpdatePlayer(@Body() playerDto: CreatePlayerDto) {
    const { email } = playerDto;
    return JSON.stringify(`{
        "email": ${email}
    }`);
  }
}
