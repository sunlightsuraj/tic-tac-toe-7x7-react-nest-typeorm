import { GamePlay } from './GamePlay.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class GameSession {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ default: 0})
	winner: number;

	@Column({ default: false })
	draw: boolean;

	@OneToMany(type => GamePlay, gamePlay => gamePlay.session_id)
	gamePlays: GamePlay[];
}