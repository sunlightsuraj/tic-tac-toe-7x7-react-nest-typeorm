import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamePlay } from '../models/GamePlay.entity';

@Injectable()
export class GamePlayService {
	constructor(
		@InjectRepository(GamePlay)
		private gamePlayRepository: Repository<GamePlay>,
	) { }

	createGamePlay(gamePlayDto): Promise<GamePlay> {
		return this.gamePlayRepository.save(gamePlayDto);
	}

	findAll(): Promise<GamePlay[]> {
		return this.gamePlayRepository.find();
	}

	findOne(id: number): Promise<GamePlay> {
		return this.gamePlayRepository.findOneBy({ id });
	}

	async remove(id: string): Promise<void> {
		await this.gamePlayRepository.delete(id);
	}
}
