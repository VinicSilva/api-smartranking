import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://atlas_xsh:j5kfEjyzo27brMC0@cluster0.dfd0z.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
