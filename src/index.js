import React from "react";
import ReactDOM from "react-dom";
import "./main.css";

// Since the Component Square doesn't have a state, we can transform it into a Functional Component
function Square(props) {
  /* 
    1 - The onClick prop on the built-in DOM <button> component tells React to set up a click event listener.
    2 - When the button is clicked, React will call the onClick event handler that is defined in Square’s render() method.
    3 - This event handler calls this.props.onClick(). The Square’s onClick prop was specified by the Board.
    4 - Since the Board passed onClick={() => this.handleClick(i)} to Square, the Square calls this.handleClick(i) when clicked.
  */
  return (
    <button className="square" onClick={props.onClick}>
      <h5>{props.value}</h5>
    </button>
  );
}

class Board extends React.Component {
  // constructor(props) {
  //   super(props); // Passing props in super is necessary for use it WITHIN the constructor
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     playerType: true
  //   };
  // }

  handleResetClick() {
    this.setState({ squares: Array(9).fill(null), playerType: true });
  }

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
        <button
          className="status mt"
          onClick={() => {
            this.handleResetClick();
          }}
        >
          RESET
        </button>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      playerType: true
    };
  }
  handleClick(i) {
    const history = this.state.history;
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
      playerType: !this.state.playerType
    });
  }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;

    if (winner) {
      status = `WINNER! ${winner}`;
    } else {
      status = `NEXT PLAYER: ${this.state.playerType ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            status={status}
            squares={current.squares}
            onClick={this.handleClick.bind(this)}
          />
        </div>
        <div className="game-info">
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ========================================
// || HELPER FUNCTIONS ||
// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let index = 0; index < lines.length; index++) {
    let [a, b, c] = lines[index];

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}
