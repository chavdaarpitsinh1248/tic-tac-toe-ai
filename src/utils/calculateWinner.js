export default function calculateWinner(board) {
    const lines = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6], // columns
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8], // diagonals
        [2, 4, 6],
    ];

    for (let line of lines) {
        const [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], winningLine: line };
        }
    }

    if (!board.includes(null)) {
        return { winner: null, winningLine: [] }; // Draw
    }

    return null; // Game ongoing
}
