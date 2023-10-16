import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { ItemBlock } from './component/ItemBlock'

const winningCondition = [
  [[0, 0], [0, 1], [0, 2]], // row 1
  [[1, 0], [1, 1], [1, 2]], // row 2
  [[2, 0], [2, 1], [2, 2]], // row 3
  [[0, 0], [1, 0], [2, 0]], // col 1
  [[0, 1], [1, 1], [2, 1]], // col 2
  [[0, 2], [1, 2], [2, 2]], // col 3
  [[0, 0], [1, 1], [2, 2]], // cross 1
  [[0, 2], [1, 1], [2, 0]], // cross 2
]

function App() {
  const [ticTacToeMap, setTicTacToeMap] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ])
  const [currentPlayer, setCurrentPlayer] = useState('X')
  const [step, setStep] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    for (let i = 0; i < winningCondition.length; i++) {
      let count = 0;
      for (let j = 0; j < winningCondition[i].length; j++) {
        let [row, col] = winningCondition[i][j];
        if (ticTacToeMap[row][col] === currentPlayer) {
          count++;
        }
      }
      if (count === 3) {
        // alert(`${currentPlayer} is winner`);
        setMessage(`${currentPlayer} is winner`)
        setTimeout(() => {
          resetGame()
        }, 1000)

      }
    }


  }, [currentPlayer, ticTacToeMap])
  useEffect(() => {

    if (step === 9 && message === '') {
      setMessage('Draw')
      setTimeout(() => {
        resetGame()
      }, 1000)

    }


  }, [step])

  const onItemClick =
    (rowIndex, colIndex) => () => {
      if (ticTacToeMap[rowIndex][colIndex] !== '') return;
      let newMap = [...ticTacToeMap]
      newMap[rowIndex][colIndex] = currentPlayer
      setTicTacToeMap(newMap)
      setCurrentPlayer(currentPlayer === 'O' ? 'X' : 'O')
      setStep(step + 1);
    }


  const resetGame = () => {
    setTicTacToeMap([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ])
    setCurrentPlayer('X')
    setStep(0)
    setMessage('')
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <p style={{ marginBottom: "1 rem" }}>{message}</p>
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
      <button onClick={resetGame}>Reset</button>

    </div>
  )
}

export default App
