import { GamePlay } from './models/GamePlay.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GameSession } from './models/GameSession.entity';
import { GameService } from './services/game.service';
import { GameController } from './controllers/game.controller';
import { GamePlayService } from './services/game-play.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([GameSession, GamePlay])
	],
	providers: [GameService, GamePlayService],
	controllers: [GameController]
})
export class GameModule {}
