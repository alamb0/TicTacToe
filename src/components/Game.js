import React, { useEffect, useState } from "react";
import "./Game.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faO,
  faX,
  faRotateRight,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";

const players = {
  1: { token: "X", icon: <FontAwesomeIcon icon={faX} title="X" /> },
  2: { token: "O", icon: <FontAwesomeIcon icon={faO} title="O" /> },
};

function Square(props) {
  const { squareNumber, player, setPlayer, game, setGame, reset, setReset } =
    props;
  const [value, setValue] = useState();

  useEffect(() => {
    if (reset) {
      setValue("");
      setPlayer(players[1]);
      setReset(false);
    }
  }, [reset, setPlayer, setReset]);

  const handleClick = () => {
    setValue(player.icon);

    if (player.token === "X") {
      setPlayer(players[2]);
    } else {
      setPlayer(players[1]);
    }

    const nextGame = {};
    nextGame.board = game.board;
    nextGame.board[squareNumber] = player.token;
    nextGame.turn = game.turn + 1;
    setGame(nextGame);
  };

  return (
    <div
      className="Square"
      onClick={handleClick}
      disabled={value}
      data-testid={`square-${squareNumber}`}
    >
      {value}
    </div>
  );
}

function Game() {
  const [player, setPlayer] = useState(players[1]);
  const [playerOneWins, setPlayerOneWins] = useState(0);
  const [playerTwoWins, setPlayerTwoWins] = useState(0);
  const [game, setGame] = useState({ board: Array(9).fill(), turn: 0 });
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState();
  const [reset, setReset] = useState(false);

  const handleReset = () => {
    setReset(true);
    setIsGameOver(false);
  };

  useEffect(() => {
    const winConditions = [
      // across
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // down
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonal
      [0, 4, 8],
      [2, 4, 6],
    ];
    let winnerText = "";
    const currentBoard = game.board;

    if (game.turn === 9) {
      winnerText = "🐈 Cat's Game 🐈";
    }

    for (const winCondition of winConditions) {
      const [i1, i2, i3] = winCondition;
      const check = currentBoard[i1] + currentBoard[i2] + currentBoard[i3];
      if (check === "XXX") {
        const nextCount = playerOneWins + 1;
        setPlayerOneWins(nextCount);
        winnerText = "🎉 🥳 X Wins!";
        break;
      } else if (check === "OOO") {
        const nextCount = playerTwoWins + 1;
        setPlayerTwoWins(nextCount);
        winnerText = "🎉 🥳 O Wins!";
        break;
      }
    }

    if (winnerText) {
      setWinner(winnerText);
      setIsGameOver(true);
      setGame({ board: Array(9).fill(), turn: 0 });
    }
  }, [
    game,
    setWinner,
    setIsGameOver,
    setGame,
    playerOneWins,
    setPlayerOneWins,
    playerTwoWins,
    setPlayerTwoWins,
  ]);

  return (
    <div className="Game">
      <div>
        <h2>
          <FontAwesomeIcon icon={faGamepad} /> Tic Tac Toe
        </h2>
        <p>
          Player 1: <FontAwesomeIcon icon={faX} /> Player 2:{" "}
          <FontAwesomeIcon icon={faO} />
        </p>
        <p>
          Player 1 Wins: {playerOneWins} Player 2 Wins: {playerTwoWins}
        </p>
      </div>
      {isGameOver && (
        <div className="GameOverInfo">
          <p>{winner}</p>
          <button className="ResetButton" onClick={handleReset}>
            <FontAwesomeIcon icon={faRotateRight} /> Play Again
          </button>
        </div>
      )}
      <div className="Board">
        {Array(9)
          .fill()
          .map((_, i) => (
            <Square
              key={i}
              squareNumber={i}
              player={player}
              setPlayer={setPlayer}
              setGame={setGame}
              game={game}
              reset={reset}
              setReset={setReset}
            />
          ))}
      </div>
    </div>
  );
}

export default Game;
