import Square from "./Square";

export default function Board({ board, onSquareClick }) {
    return (
        <div className="board">
            {board.map((value, idx) => (
                <Square
                    key={idx}
                    value={value}
                    onClick={() => onSquareClick(idx)}
                />
            ))}
        </div>
    );
}
