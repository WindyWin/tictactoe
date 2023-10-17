import './App.css'

import { ItemBlock } from './components/ItemBlock'
import { PlayerLevelSection } from './components/PlayerLevelSection'

import { useTicTacToe } from './useTicTacToe'
function App() {
  const { onResetGame, onSetPlayerLevel, onPlayerClick, state } = useTicTacToe()
  const { ticTacToeMap, currentPlayer, playerInfo, message } = state;
  return (
    <div className="mt-3 flex flex-col gap-4 ">
      <div className="flex justify-around items-center" >
        <span>Turn:
          <div className="flex gap-8">
            <PlayerLevelSection playerName='X' playerInfo={playerInfo} currentPlayer={currentPlayer} onSetPlayerLevel={onSetPlayerLevel} />
            <PlayerLevelSection playerName='O' playerInfo={playerInfo} currentPlayer={currentPlayer} onSetPlayerLevel={onSetPlayerLevel} />

          </div>
        </span>
        <button className="bg-slate-300 py-2 px-5 " onClick={onResetGame}>Reset</button>
      </div>
      <div className='flex flex-col justify-center items-center'>
        {ticTacToeMap.map((row, rowIndex) => {
          return <div key={rowIndex} className='flex'>{
            row.map((item, colIndex) => (
              <ItemBlock
                key={`${rowIndex}-${colIndex}`}
                item={item}
                onClick={onPlayerClick(rowIndex, colIndex)} />
            ))
          }</div>
        })}
      </div>
      <p className='text-2xl font-semibold text-center text-red-700'>{message}</p>

    </div>
  )
}

export default App


