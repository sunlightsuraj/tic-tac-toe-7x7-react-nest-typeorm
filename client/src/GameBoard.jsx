import { useEffect, useState } from "react";
import { saveGamePlay, saveWinner } from "./services/game.service";

const GameBoard = ({ n, winCount, session }) => {
	const [matrix, setMatrix] = useState(
		Array(n).fill(Array(n).fill(0))
	);
	const [turn, setTurn] = useState(1);
	const [activePlayer, setActivePlayer] = useState(1);
	const [finished, setFinished] = useState(false);
	const [winner, setWinner] = useState(0);
	const [draw, setDraw] = useState(false);

	const checkVerticalGameWin = (r, c) => {
		let continueousCount = 1;

		// check vertical up
		for (let i = (r - 1);i >= 0;i--) {
			console.log(`vu: ${i}:${c} => ${matrix[i][c]}`)
			if ((matrix[i][c] !== activePlayer) || continueousCount >= winCount) {
				break;
			}

			continueousCount++;
		}
		if (continueousCount < winCount) {
			// check vertical down
			for (let i = (r + 1);i < n;i++) {
				console.log(`vd: ${i}:${c} => ${matrix[i][c]}`)
				if ((matrix[i][c] !== activePlayer) || continueousCount >= winCount) {
					break;
				}
				continueousCount++;
			}
		}

		return continueousCount;
	}

	const checkHorizontalGameWin = (r, c) => {
		let continueousCount = 1;

		// check horizontal up
		for (let i = (c - 1);i >= 0;i--) {
			if ((matrix[r][i] !== activePlayer) || continueousCount >= winCount) {
				break;
			}
			continueousCount++;
		}
		if (continueousCount < winCount) {
			// check horizontal down
			for (let i = (c + 1);i < n;i++) {
				if ((matrix[r][i] !== activePlayer) || continueousCount >= winCount) {
					break;
				}
				continueousCount++;
			}
		}

		return continueousCount;
	}

	const checkLeftCrossGameWin = (r, c) => {
		let continueousCount = 1;

		// check left cross up
		let i = 1;
		while ((r - i >= 0) && (c - i >= 0)) {
			if ((matrix[r - i][c - i] !== activePlayer) || continueousCount >= winCount) {
				break;
			}
			continueousCount++;
			i++;
		}
		if (continueousCount < winCount) {
			// check right cross down
			i = 1;
			while ((r + i < n) && (c + i < n)) {
				if ((matrix[r + i][c + i] !== activePlayer) || continueousCount >= winCount) {
					break;
				}
				continueousCount++;
				i++;
			}
		}

		return continueousCount;
	}

	const checkRightCrossGameWin = (r, c) => {
		let continueousCount = 1;

		// check right cross up
		let i = 1;
		while ((r - i >= 0) && (c + i < n)) {
			if ((matrix[r - i][c + i] !== activePlayer) || continueousCount >= winCount) {
				break;
			}
			continueousCount++;
			i++;
		}
		if (continueousCount < winCount) {
			// check left cross down
			i = 1;
			while ((r + i < n) && (c - i >= 0)) {
				if ((matrix[r + i][c - i] !== activePlayer) || continueousCount >= winCount) {
					break;
				}
				continueousCount++;
				i++;
			}
		}

		return continueousCount;
	}

	const checkGameWin = (r, c) => {

		// check vertical
		let count = checkVerticalGameWin(r, c);
		console.log('v', count);
		if (count < winCount) {
			// check horizontal
			count = checkHorizontalGameWin(r, c);
			console.log('h', count);
			if (count < winCount) {
				// check upper left to right down cross
				count = checkLeftCrossGameWin(r, c);
				console.log('lc', count);
				if (count < winCount) {
					// check upper right to left down cross
					count = checkRightCrossGameWin(r, c);
					console.log('rc', count);
				}
			}
		}

		if (count >= winCount) {
			setFinished(true);
			setWinner(activePlayer);
			return true;
		}
		
		return false;
	}

	const onClickBox = (r, c) => {
		if (!finished && matrix[r][c] === 0) {
			addGamPlay(activePlayer, turn, r, c);

			setMatrix([
				...matrix.slice(0, r),
				[
					...matrix[r].slice(0, c),
					activePlayer,
					...matrix[r].slice(c + 1, matrix[r].length)
				],
				...matrix.slice(r + 1, matrix.length)
			])

			let win = checkGameWin(r, c);
			if (win) {
				saveGameWin(activePlayer)
			}

			if(activePlayer === 3) {
				setTurn(turn + 1)
			}
			
			setActivePlayer(activePlayer === 1 ? 2 : (activePlayer === 2 ? 3 : 1));

			
		}
	}

	const addGamPlay = (player, turn, r, c) => {
		saveGamePlay({
			session_id: session,
			player_turn: turn,
			player_id: player,
			position_row: r,
			position_col: c
		}).then((data) => {

		}).catch (err => {
			alert(err);
		})
	}

	const saveGameWin = (player) => {
		saveWinner({
			id: session,
			winner: player
		}).then(() => {

		}).catch(err => {
			alert(err);
		})
	}

	useEffect(() => {
		let d = true;
		for (let r = 0; r < matrix.length; r++) {
			for (let c = 0; c < matrix[r].length; c++) {
				if (matrix[r][c] === 0) {
					d = false;
					break;
				}
			}
		}

		if (d) {
			setDraw(true);
		}
	}, [matrix])

	return (
		<div className="d-flex w-50 m-auto">
			<div style={{ width: '20%' }}>
				<div>
					<p>
						{activePlayer === 1 ? <span className="m-2">===&gt;</span> : null}
						<span>Player 1: X</span>
					</p>
					<p>
						{activePlayer === 2 ? <span className="m-2">===&gt;</span> : null}
						<span>Player 2: O</span>
					</p>
					<p>
						{activePlayer === 3 ? <span className="m-2">===&gt;</span> : null}
						<span>Player 3: ^</span>
					</p>
				</div>
				<div>
					{
						winner ? (
							<p>Winner: Player {winner}</p>
						) : null
					}
				</div>
				<div>
					{
						draw ? (
							<p>Game Draw</p>
						) : null
					}
				</div>
			</div>
			<div className="card w-50 m-auto rounded-0 p-0">
				<div className="card-body p-0">
					{
						matrix.map((row, i) => (
							<div className="d-flex" key={i}>
								{
									row.map((player, j) => (
										<div className="box bg-success text-center align-middle m-1 p-1 fw-bold fs-4" onClick={() => onClickBox(i, j)} key={i + '' + j}>
											{
												player === 1 ? 'X' : (player === 2 ? 'O' : (player === 3 ? '^' : ''))
											}
										</div>
									))
								}
							</div>
						))
					}
				</div>
			</div>
		</div>
	)
}

export default GameBoard;