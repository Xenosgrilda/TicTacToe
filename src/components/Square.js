import React from "react";

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

export default Square;
