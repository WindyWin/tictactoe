import { useState } from 'react'
import './App.css'
import { ItemBlock } from './component/ItemBlock'

const winningCondition = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
]

function App() {
  const [ticTacToeMap, setTicTacToeMap] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [step, setStep] = useState(0)


  const onItemClick =
    (rowIndex, colIndex) => () => {
      if(ticTacToeMap[rowIndex][colIndex] !== '') return;
      let newMap = [...ticTacToeMap]
      newMap[rowIndex][colIndex] = currentPlayer
      setTicTacToeMap(newMap)
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
      setStep(step + 1);
      if (checkWinner()) {
        resetGame()
      }
      else {
        checkDraw();
      }
    }


  const resetGame = () => {
    setTicTacToeMap([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setCurrentPlayer('X')
    setStep(0)
  }

  const checkWinner = () => {
    for (let i = 0; i < winningCondition.length; i++) {
      let count = 0;
      for (let j = 0; j < winningCondition[i].length; j++) {
        let [row, col] = winningCondition[i][j];
        if (ticTacToeMap[row][col] === currentPlayer) {
          count++;
        }
      }
      if (count === 3) {
        alert(`${currentPlayer} is winner`);
        return true;
      }
    }
    return false;

  }
  const checkDraw = () => {
    if (step === 8) {
      alert('Draw');
      resetGame()
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',height:'100vh' }}>
      {ticTacToeMap.map((row, rowIndex) => {
        return <div key={rowIndex} style={{ display: 'flex' }}>{
          row.map((item, colIndex) => (
            <ItemBlock
              key={`${rowIndex}-${colIndex}`}
              item={item}
              onClick={onItemClick(rowIndex, colIndex)} />
          ))
        }</div>

      })}

    </div>
  )
}

export default App
