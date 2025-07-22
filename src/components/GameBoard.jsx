

export default function GameBoard({bord,onSelectSquere}) {
    
    // const [gameBoard,setGameBoard] = useState(initialGameBoard);
    // const handleSelectSquare = (rowIndex,colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updateBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
    //         updateBoard[rowIndex][colIndex] = activeSymbol;
    //         return updateBoard
    //     });
    //     onSelectSquere();
    // }
    return (
        <ol id="game-board">
            {bord.map((row, rowIndex) => {
                return (
                    <li key={rowIndex}>
                        <ol>
                            {
                                row.map((col, colIndex) => {
                                    return( 
                                        <li key={colIndex}>
                                            <button disabled={col !== null} onClick={()=>{onSelectSquere(rowIndex,colIndex)}}>{col}</button>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </li>
                );
            })
            }
        </ol>
    );
}