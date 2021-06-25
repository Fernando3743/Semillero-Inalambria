import React, { Component } from "react";
import Board from "./Board";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xIsNext: true,
      stepNumber: 0,
      history: [{ squares: Array(9).fill(null) }],
      player1: "Player1",
      player2: "Player2",
    };
  }

  componentDidMount() {
    const player1Name = prompt(
      "Welcome Player 1️ ! \nPlease write your name ⬇⬇⬇"
    );
    const player2Name = prompt(
      "Welcome Player 2️ ! \nPlease write your name ⬇⬇⬇"
    );

    if (player1Name) this.setState({ player1: player1Name });
    if (player2Name) this.setState({ player2: player2Name });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    let winnerName;
    if (winner) {
      const { player1, player2 } = this.state;
      winnerName = winner === "X" ? `🧙‍♂️ ${player1} 🧙‍♂️` : `👨‍🚀 ${player2} 👨‍🚀`;
      status = ["Winner is " + winnerName];
    } else {
      status = [
        "Next Player is",
        this.state.xIsNext
          ? `🧙‍♂️ ${this.state.player1} 🧙‍♂️ ( X )`
          : `👨‍🚀 ${this.state.player2} 👨‍🚀 ( O )`,
      ];
    }

    return (
      <div>
        <h1>
          {winner ? (
            <div>
              The Winner is {winnerName}
              <br />
              🥳🥳🥳
            </div>
          ) : (
            "🎮 Tic Tac Toe 🎮"
          )}
        </h1>
        <div className="game">
          <div className="game-board">
            <Board
              onClick={(i) => this.handleClick(i)}
              squares={current.squares}
            />
          </div>
          <div className="game-info">
            <div className="game-info-status">
              {this.state.stepNumber < 9 ? (
                <div>
                  {status[0]} <br /> {status[1]}
                </div>
              ) : (
                "👨‍✈️ TIE 👨‍✈️"
              )}
            </div>
            <button
              onClick={() => {
                this.jumpTo(0);
              }}
              className={`button is-secondary ${
                (winner || this.state.stepNumber > 8) && "animate-bounce"
              }`}
            >
              Play Again
            </button>
          </div>
        </div>
        <footer>Made by Luis Fernando, with ❤️ in Cali-Colombia</footer>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
