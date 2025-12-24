import { useState, useEffect } from "react";
import Board from "./Board";
import History from "./History";
import calculateWinner from "../utils/calculateWinner";
import { minimax } from "../ai/minimax";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const [mode, setMode] = useState("PvAI"); // "PvP" or "PvAI"
    const [aiThinking, setAiThinking] = useState(false);

    const currentBoard = history[currentMove];
    const result = calculateWinner(currentBoard);
    const winner = result?.winner;

    const [lastMoveIndex, setLastMoveIndex] = useState(null);

    const handleMove = (index) => {
        if (currentBoard[index] || winner || aiThinking) return;

        const newBoard = [...currentBoard];
        newBoard[index] = isXNext ? "X" : "O";

        const newHistory = history.slice(0, currentMove + 1);
        setHistory([...newHistory, newBoard]);
        setCurrentMove(newHistory.length);
        setIsXNext(!isXNext);
        setLastMoveIndex(index); // Track last move
    };


    const jumpTo = (move) => {
        setCurrentMove(move);
        setIsXNext(move % 2 === 0);
    };

    const resetGame = () => {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setIsXNext(true);
        setLastMoveIndex(null);
        setAiThinking(false);
    };


    // AI Effect
    useEffect(() => {
        if (mode === "PvAI" && !isXNext && !winner) {
            setAiThinking(true);
            const timer = setTimeout(() => {
                const { idx } = minimax(currentBoard, 0, true);
                handleMove(idx);
                setAiThinking(false);
            }, 400); // 400ms delay
            return () => clearTimeout(timer);
        }
    }, [currentBoard, isXNext, winner, mode]);

    return (
        <div className="game">
            <div>
                <label>
                    <input
                        type="radio"
                        checked={mode === "PvP"}
                        onChange={() => setMode("PvP")}
                        disabled={aiThinking}
                    />
                    Player vs Player
                </label>
                <label>
                    <input
                        type="radio"
                        checked={mode === "PvAI"}
                        onChange={() => setMode("PvAI")}
                        disabled={aiThinking}
                    />
                    Player vs AI
                </label>
            </div>

            <button className="reset-button" onClick={resetGame}>
                Restart Game
            </button>

            <h3>
                {winner
                    ? winner === "draw" ? "It's a Draw!" : `Winner: ${winner}`
                    : aiThinking
                        ? <div className="ai-thinking">
                            AI is thinking<span className="dots">...</span>
                        </div>
                        : <div className="player-indicator">
                            Next: <span className={isXNext ? "player-x" : "player-o"}>{isXNext ? "X" : "O"}</span>
                        </div>
                }
            </h3>

            <Board board={currentBoard} onSquareClick={handleMove} disabled={winner || aiThinking} />
            <History history={history} jumpTo={jumpTo} />
        </div>
    );
}
