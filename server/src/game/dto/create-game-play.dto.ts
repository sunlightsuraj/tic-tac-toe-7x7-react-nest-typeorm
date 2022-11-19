import { IsNotEmpty } from 'class-validator';

export class CreateGamePlayDto {
	@IsNotEmpty()
	session_id: number;

	@IsNotEmpty()
	player_turn: number;

	@IsNotEmpty()
	player_id: number;

	@IsNotEmpty()
	position_row: number;

	@IsNotEmpty()
	position_col: number;
}