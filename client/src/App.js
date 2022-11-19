import { useState } from 'react';
import './App.css';
import GameBoard from './GameBoard';
import { createNewSession } from './services/game.service';
const n = 7;
const winCount = 6;

function App() {
	const [session, setSession] = useState();

	const onClickNewGame = () => {
		setSession(1);
		createNewSession()
			.then((data) => {
				setSession(data.id)
			}).catch (err => {
				alert(err);
			})
	}

	return (
		<div className="App">
			<div className="App-header mt-5">
				{
					!session ? (
						<button className="btn btn-primary btn-lg btn-block rounded-0" onClick={onClickNewGame}>New Game</button>
					) : (
						<GameBoard n={n} winCount={winCount} session={session} />
					)
				}
			</div>
		</div>
  	);
}

export default App;
