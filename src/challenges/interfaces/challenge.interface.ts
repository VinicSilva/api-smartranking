import { Document } from 'mongoose';
import { Match } from 'src/matches/interfaces/match.interface';
import { Player } from 'src/players/interfaces/player.interface';

export interface Challenge extends Document {
  challengeDateTime: Date;
  status: ChallengeStatus;
  inviteDateTime: Date;
  answerDateTime: Date;
  challenger: Player;
  category: string;
  players: Array<Player>;
  match: Match;
}
