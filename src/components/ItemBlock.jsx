import PropTypes from 'prop-types';
import { PlayerPointer } from './PlayerPointer.jsx';

const ItemBlock = ({ item, onClick }) => {
    return (
        <div onClick={onClick} className='flex justify-center items-center w-[70px] h-[70px] border'>
            <PlayerPointer  currentPlayer={item.player} level={item.level}  />
        </div>
    );
};

ItemBlock.propTypes = {
    item: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
};

export { ItemBlock };

