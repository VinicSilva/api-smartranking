import { Module } from '@nestjs/common';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { MatchesModule } from './matches/matches.module';
import { ChallengesModule } from './challenges/challenges.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://atlas_xsh:j5kfEjyzo27brMC0@cluster0.dfd0z.mongodb.net/smartranking?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
    PlayersModule,
    CategoriesModule,
    MatchesModule,
    ChallengesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
