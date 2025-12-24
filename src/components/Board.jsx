import Square from "./Square";
import calculateWinner from "../utils/calculateWinner";

export default function Board({ board, onSquareClick, disabled }) {
    const result = calculateWinner(board);
    const winningLine = result?.winningLine || [];

    const renderSquare = (idx) => (
        <Square
            key={idx}
            value={board[idx]}
            onClick={() => !disabled && onSquareClick(idx)}
            highlight={winningLine.includes(idx)}
        />
    );

    return <div className="board">{board.map((_, idx) => renderSquare(idx))}</div>;
}
