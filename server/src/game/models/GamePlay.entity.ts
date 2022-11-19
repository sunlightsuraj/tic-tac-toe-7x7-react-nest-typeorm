import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GamePlay {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	session_id: number;

	@Column()
	player_turn: number;

	@Column()
	player_id: number;

	@Column()
	position_row: number;

	@Column()
	position_col: number;
}
