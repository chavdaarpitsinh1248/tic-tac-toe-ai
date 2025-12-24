export default function Square({ value, onClick, highlight, isLastMove }) {
    return (
        <button
            className={`square ${highlight ? "highlight" : ""} ${isLastMove ? "last-move" : ""}`}
            onClick={onClick}
        >
            {value}
        </button>
    );
}
