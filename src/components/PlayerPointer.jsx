import PropTypes from 'prop-types';
import playerImage from '../assets/scylla-opensource.png';

const PlayerPointer = ({ currentPlayer, level }) => {
    return (
        <div className='h-full justify-center items-end flex p-1'>
           { !!currentPlayer&&
            <img
                src={playerImage}
                alt=""
                className={`object-cover
                ${level === 3 ? 'h-5/6' : level === 2 ? 'h-4/6' : 'h-3/6'} ${
                    currentPlayer === 'X' ? '' : 'hue-rotate-90' 
                } `}
            />
            }
        </div>
    );
};

PlayerPointer.propTypes = {
    currentPlayer: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
};

export { PlayerPointer };

