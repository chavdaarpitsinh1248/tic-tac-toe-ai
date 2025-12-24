export default function Board({ board, onSquareClick, disabled, lastMoveIndex }) {
    const result = calculateWinner(board);
    const winningLine = result?.winningLine || [];

    const renderSquare = (idx) => (
        <Square
            key={idx}
            value={board[idx]}
            onClick={() => !disabled && onSquareClick(idx)}
            highlight={winningLine.includes(idx)}
            isLastMove={idx === lastMoveIndex}
        />
    );

    return <div className="board">{board.map((_, idx) => renderSquare(idx))}</div>;
}
