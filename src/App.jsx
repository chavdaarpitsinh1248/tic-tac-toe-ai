import React from "react";
import Game from "./components/Game";
import "./index.css";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Advanced Tic-Tac-Toe</h1>
      </header>
      <main>
        <Game />
      </main>
      <footer>
        <p>Built with React – AI coming next!</p>
      </footer>
    </div>
  );
}
