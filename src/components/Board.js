import React, { Component } from "react";
import Square from "./Square";

export class Board extends Component {
  // constructor(props) {
  //   super(props); // Passing props in super is necessary for use it WITHIN the constructor
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     playerType: true
  //   };
  // }

  renderSquare(i) {
    return (
      <Square
        // Passing the function "handleClick" down to the prop so it can call it from the board
        value={this.props.squares[i]}
        // Equivalent to onClick={this.handleClick.bind(this, i)} READ https://reactjs.org/docs/faq-functions.html
        onClick={() => this.props.onClick(i)} // Link para entender bind() https://tableless.com.br/explorando-metodo-bind-em-javascript/
      />
    );
  }

  render() {
    const { status } = this.props;
    return (
      <div className="board">
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
        <button className="status mt" onClick={this.props.onResetClick}>
          RESET
        </button>
      </div>
    );
  }
}

export default Board;
