export default function GameOver ({onRestart,winner}){
    return(
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won !</p>}
            {!winner && <p>Its a Draw !</p>}
            <p><button onClick={onRestart}>Rematch!</button></p>

        </div>
    )
}