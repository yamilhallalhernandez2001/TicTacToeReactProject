import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const PLAYERS = {
  X: 'Player1',
  O: 'Player2'
}

function deriveActivePlayer (prevTurn) {
    let curretPlayer = 'X';
    if(prevTurn.length > 0){
      prevTurn[0].player === 'X' ? curretPlayer = 'O' : curretPlayer = 'X';
    }
    return curretPlayer;
}

function deriveWinner(gameBoard,players){
   let winner;

  for(const combinations of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol = gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol = gameBoard[combinations[2].row][combinations[2].column];
    
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray)=>[...innerArray])];
  

  for(const turn of gameTurns){
      const {square,player} = turn;
      const {row,col} = square;
      gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [gameTurns,setGameTurns] = useState([]);
  const [players,setPlayers] = useState(PLAYERS);
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard,players);
  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (row,col) => {
    setGameTurns(prevTurn => {
      const curretPlayer = deriveActivePlayer(prevTurn);
      const updateTurns = [{square: {row: row, col: col},player:curretPlayer},...prevTurn];
      return updateTurns;
    });
  }

  const handleRematch = () => {
    setGameTurns([]);
    winner = null;
  }
  const handlerPlayerNameChange = (symbol,newName) =>{
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,[symbol]: newName
      }
    });
  }
  return (
   <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
            <Player onChangeName = {handlerPlayerNameChange} isActive={activePlayer === 'X'} name={PLAYERS.X} symbol ="X"/>
            <Player onChangeName = {handlerPlayerNameChange} isActive={activePlayer === 'O'} name={PLAYERS.O} symbol ="O"/>
        </ol>
        {(winner || hasDraw) && <GameOver onRestart={handleRematch} winner={winner}/>}
        <GameBoard bord = {gameBoard} onSelectSquere={handleSelectSquare}/>
      </div>
      <Log gameTurns = {gameTurns}/>
   </main>
  )
}

export default App
