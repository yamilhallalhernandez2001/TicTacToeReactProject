export default function Log ({gameTurns}) {
    return(
        <ol id="log">
            {
                gameTurns.map((item)=>{
                    return(
                        <li key={`${item.square.row}${item.square.col}`}>
                            {item.player} selected {item.square.row},{item.square.col} 
                        </li>
                    );
                })
            }
        </ol>
    );
}