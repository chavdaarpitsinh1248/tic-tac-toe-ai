import { useState } from "react";
import Board from "./Board";
import History from "./History";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const [mode, setMode] = useState("PvAI"); // "PvP" or "PvAI"

    const currentBoard = history[currentMove];

    const handleMove = (index) => {
        // Placeholder for now
        console.log("Clicked square:", index);
    };

    const jumpTo = (move) => {
        setCurrentMove(move);
        setIsXNext(move % 2 === 0);
    };

    return (
        <div className="game">
            <h1>Advanced Tic-Tac-Toe</h1>

            <div>
                <label>
                    <input
                        type="radio"
                        checked={mode === "PvP"}
                        onChange={() => setMode("PvP")}
                    />
                    Player vs Player
                </label>
                <label>
                    <input
                        type="radio"
                        checked={mode === "PvAI"}
                        onChange={() => setMode("PvAI")}
                    />
                    Player vs AI
                </label>
            </div>

            <Board board={currentBoard} onSquareClick={handleMove} />
            <History history={history} jumpTo={jumpTo} />
        </div>
    );
}
