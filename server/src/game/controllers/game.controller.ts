import { GamePlayService } from './../services/game-play.service';
import { CreateGamePlayDto } from './../dto/create-game-play.dto';
import { GameService } from './../services/game.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
	constructor (
		private gameService: GameService,
		private gamePlayService: GamePlayService,
	) { }

	@Post()
	async createNewSession() {
		console.log("daa");
		let gameSession = await this.gameService.createNewGameSession();
		return gameSession;
	}

	@Post('play')
	async addPlayerStep(@Body() createGamePlayDto: CreateGamePlayDto) {
		let gamePlay = await this.gamePlayService.createGamePlay(createGamePlayDto);
		return gamePlay;
	}

	@Post('win')
	async saveWin(@Body('id') id: number, @Body('winner') winner: number) {
		let gameSession = await this.gameService.findOne(id);
		if (!gameSession)
			throw new Error("Invalid game session.");

		gameSession.winner = winner;
		await this.gameService.save(gameSession);
		return true;
	}
}
