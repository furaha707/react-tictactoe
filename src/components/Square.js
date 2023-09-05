import React from 'react'
import './Square.css'

const Square = ({handleSquare, squares}) => {
  return (
    <button type="button" className="square" onClick={handleSquare}>
      {squares}
    </button>
  )
}

export default Square
