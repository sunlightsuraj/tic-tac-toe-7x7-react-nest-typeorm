import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameSession } from '../models/GameSession.entity';

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(GameSession)
		private gameRepository: Repository<GameSession>,
	) { }

	createNewGameSession(): Promise<GameSession> {
		let gameSession = this.gameRepository.create({});
		return this.gameRepository.save(gameSession);
	}

	findAll(): Promise<GameSession[]> {
		return this.gameRepository.find();
	}

	findOne(id: number): Promise<GameSession> {
		return this.gameRepository.findOneBy({ id });
	}

	async save(gameSession: GameSession): Promise<boolean> {
		await this.gameRepository.save(gameSession);
		return true;
	}

	async remove(id: string): Promise<void> {
		await this.gameRepository.delete(id);
	}
}
