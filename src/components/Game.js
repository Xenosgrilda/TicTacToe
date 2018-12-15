import React, { Component } from "react";
import Board from "./Board";
import Info from "./Info";
import calculateWinner from "../helpers/calculateWinner";

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      playerType: true
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); // We use slice to create a copy of the array without altering the state

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.playerType ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      playerType: !this.state.playerType
    });
  }
  handleResetClick() {
    this.setState({
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      playerType: true
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      playerType: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;

    if (winner) {
      status = `WINNER! ${winner}`;
    } else {
      status = `NEXT PLAYER: ${this.state.playerType ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <Board
          status={status}
          squares={current.squares}
          onClick={this.handleClick.bind(this)}
          onResetClick={this.handleResetClick.bind(this)}
        />
        <Info moves={moves} />
      </div>
    );
  }
}

export default Game;
