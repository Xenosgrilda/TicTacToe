import React from "react";

function Info(props) {
  const { moves } = props;
  return (
    <div className="game-info">
      <ol>{moves}</ol>
    </div>
  );
}

export default Info;
