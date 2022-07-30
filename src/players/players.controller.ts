import { UpdatePlayerDto } from './dto/update-player.dto';
import { PlayersService } from './players.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayer(@Body() playerDto: CreatePlayerDto): Promise<Player> {
    return this.playersService.create(playerDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayer(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
    @Body() playerDto: UpdatePlayerDto,
  ): Promise<void> {
    return this.playersService.update(_id, playerDto);
  }

  @Get()
  async getPlayers(): Promise<Player[]> {
    return this.playersService.get();
  }

  @Get('/:_id')
  async getPlayerById(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<Player> {
    return this.playersService.getById(_id);
  }

  @Delete('/:_id')
  async deletePlayer(
    @Param('_id', PlayersValidationParamsPipe) _id: string,
  ): Promise<void> {
    await this.playersService.delete(_id);
  }
}
