import React, { useState } from "react";
import './App.css'
import Board from "./components/Board";

function App() {
  
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}]);
  const [xIsNext, setXIsNext] = useState(true);
  const [step, setStep] = useState(0)

  const calculateWinner = (squares) => {
    const line = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
    for (let index = 0; index < line.length; index++){
      const [a,b,c] = line[index];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
    }
    return null;
  }

  const current = history[step];
  const winner = calculateWinner(current.squares);

  let status;

  if(winner){
    status = 'Winner: ' + winner;
  }else {
    status = `${xIsNext ? 'X' : 'O'}`
  }

  const handleSquare = (index) => {
    const newHistory = history.slice(0, step + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newState = newCurrent.squares.slice();

    if(calculateWinner(newState) || newState[index]){
      return;
    }
    
    newState[index] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, {squares: newState}])
    setXIsNext(!xIsNext);
    setStep(newHistory.length);
  }

  const moves = history.map((step, index) => {
    const desc = index ? 
    'Go to move #' + index :
    'Go to game start';
    return (
      <li key={index}>
        <button onClick={() => jumpTo(index)}>{desc}</button>
      </li>
    )
  })

  const jumpTo = (step) => {
    setStep(step);
    // 스텝이 짝수면 true
    setXIsNext((step % 2) === 0); 
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} handleSquare={handleSquare}/>
      </div>
      <div className="game-info">
        <div className='status'>Next Player: {status}</div>
        <ol>
          {moves}
        </ol>
      </div>
    </div>
  )
}

export default App;
