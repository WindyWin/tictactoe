import PropTypes from 'prop-types';
import { PlayerPointer } from "./PlayerPointer";

const PlayerLevelSection = ({currentPlayer, playerInfo, onSetPlayerLevel, playerName}) => {
    const borderStyle = playerName === 'X' ? 'border-2 border-blue-400' : 'border-2 border-purple-400'
    console.log(playerInfo)
    return <div className={`flex ${currentPlayer === playerName ? borderStyle : ''}`}>
        {playerInfo[playerName].items.map((item, index) => {
            const level = index + 1
            return <div onClick={onSetPlayerLevel(index + 1, playerName)} key={index} className={`${playerInfo[playerName].level === level ? borderStyle : ''} ${item && currentPlayer === playerName ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                <div className='flex-1 h-[70px] w-[70px] overflow-hidden object-scale-down'>
                    <PlayerPointer currentPlayer={playerName} level={level} />
                </div>
                <p className='text-center'>{item}</p>
            </div>
        })}
    </div>
}

PlayerLevelSection.propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    playerInfo: PropTypes.object.isRequired,
    onSetPlayerLevel: PropTypes.func.isRequired,
    playerName: PropTypes.string.isRequired
};

export default PlayerLevelSection;

export { PlayerLevelSection };

