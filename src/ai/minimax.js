import calculateWinner from "../utils/calculateWinner";

export function minimax(board, depth, isMaximizing) {
    const result = calculateWinner(board);

    if (result?.winner === "O") return { score: 10 - depth };
    if (result?.winner === "X") return { score: depth - 10 };
    if (result && !board.includes(null)) return { score: 0 }; // Draw

    const moves = [];

    board.forEach((cell, idx) => {
        if (!cell) {
            const newBoard = [...board];
            newBoard[idx] = isMaximizing ? "O" : "X";

            const { score } = minimax(newBoard, depth + 1, !isMaximizing);
            moves.push({ idx, score });
        }
    });

    if (isMaximizing) {
        const bestMove = moves.reduce((a, b) => (a.score > b.score ? a : b));
        return bestMove;
    } else {
        const bestMove = moves.reduce((a, b) => (a.score < b.score ? a : b));
        return bestMove;
    }
}
