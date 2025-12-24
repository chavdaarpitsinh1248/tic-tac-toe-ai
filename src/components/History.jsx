export default function History({ history, jumpTo }) {
    return (
        <div className="history">
            <h3>Move History</h3>
            <ul>
                {history.map((_, move) => (
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>
                            {move === 0 ? "Go to start" : `Go to move #${move}`}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
