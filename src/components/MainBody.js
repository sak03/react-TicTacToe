import React, { useEffect, useRef, useState } from "react";
import "./mainBody.css";

const MainBody = () => {
  const music = new Audio("music.mp3");
  const turnMusic = new Audio("tik.mp3");
  const gameOverMusic = new Audio("gameOver.mp3");
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState(0);
  const [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    setData(["", "", "", "", "", "", "", "", ""]);
    // const cells = boardRef.current.children;
    // for (let i = 0; i < 9; i++) {
    //     cells[i].innerText = '';
    // }
    setTurn(0);
    setReset(false);
  }, [reset, setReset, setWinner]);

  // Function to draw X/0 on the board
  const drawTurn = (event, index) => {
    if (data[index - 1] === "" && winner === "") {
      const current = turn === 0 ? "X" : "0";
      data[index - 1] = current;
      event.target.innerText = current;
      setTurn(turn === 0 ? 1 : 0);
    }
  };

  const resetBoard = () => {
    // setData(["", "", "", "", "", "", "", "", ""]);
    setReset(true);
  };

  // useEffect hook used to check for a winner
  useEffect(() => {
    // Checks for the win condition in rows
    const checkRow = () => {
      let ans = false;
      for (let i = 0; i < 9; i += 3) {
        ans |=
          data[i] === data[i + 1] && data[i] === data[i + 2] && data[i] !== "";
      }
      return ans;
    };
    // Checks for the win condition in cols
    const checkCol = () => {
      let ans = false;
      for (let i = 0; i < 3; i++) {
        ans |=
          data[i] === data[i + 3] && data[i] === data[i + 6] && data[i] !== "";
      }
      return ans;
    };
    // Checks for the win condition in diagonals
    const checkDiagonal = () => {
      return (
        (data[0] === data[4] && data[0] === data[8] && data[0] !== "") ||
        (data[2] === data[4] && data[2] === data[6] && data[2] !== "")
      );
    };
    // Checks if at all a win condition is present
    const checkWin = () => {
      return checkRow() || checkCol() || checkDiagonal();
    };
    // Checks for a tie
    const checkDraw = () => {
      let count = 0;
      data.forEach((cell) => {
        if (cell != "") {
          count++;
        }
      });
      return count === 9;
    };
    // Setting the winner in case of a win
    if (checkWin()) {
      setWinner(turn === 0 ? "Player 2 win" : "Player 1 win");
    } else if (checkDraw()) {
      setWinner("It's a tie");
    }
  });

  return (
    <div className="mainBody">
      <div className="gameBoard">
        <div className="tableData">
          <div className="rowData">
            <div
              className="cellData cell1"
              onClick={(e) => drawTurn(e, 1)}
            ></div>
            <div
              className="cellData cell2"
              onClick={(e) => drawTurn(e, 2)}
            ></div>
            <div
              className="cellData cell3"
              onClick={(e) => drawTurn(e, 3)}
            ></div>
          </div>
          <div className="rowData">
            <div
              className="cellData cell4"
              onClick={(e) => drawTurn(e, 4)}
            ></div>
            <div
              className="cellData cell5"
              onClick={(e) => drawTurn(e, 5)}
            ></div>
            <div
              className="cellData cell6"
              onClick={(e) => drawTurn(e, 6)}
            ></div>
          </div>
          <div className="rowData">
            <div
              className="cellData cell7"
              onClick={(e) => drawTurn(e, 7)}
            ></div>
            <div
              className="cellData cell8"
              onClick={(e) => drawTurn(e, 8)}
            ></div>
            <div
              className="cellData cell9"
              onClick={(e) => drawTurn(e, 9)}
            ></div>
          </div>
        </div>
      </div>
      <div className="gameData">
        <h3 className="headValue">Welcome to Tic Tac Toe</h3>
        <div className="allInfo">
          <div className="info">
            <div className="player">Player 1: X & Player 2: O</div>
          </div>
          <div className={`winner ${winner !== "" ? "" : "shrink"}`}>
            <div className="winner-text">{winner}</div>
            <button onClick={() => resetBoard()}>Reset </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBody;
