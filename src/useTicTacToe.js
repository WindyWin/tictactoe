import { useEffect, useReducer } from 'react';
const WinningPoints = [
    [[0, 0], [0, 1], [0, 2]], // horizontal top row
    [[1, 0], [1, 1], [1, 2]], // horizontal middle row
    [[2, 0], [2, 1], [2, 2]], // horizontal bottom row
    [[0, 0], [1, 0], [2, 0]], // vertical left column
    [[0, 1], [1, 1], [2, 1]], // vertical middle column
    [[0, 2], [1, 2], [2, 2]], // vertical right column
    [[0, 0], [1, 1], [2, 2]], // diagonal top left to bottom right
    [[0, 2], [1, 1], [2, 0]]  // diagonal top right to bottom left
];

const initialState = {
    ticTacToeMap: [
        [{ player: '', level: 1 }, { player: '', level: 1 }, { player: '', level: 1 }],
        [{ player: '', level: 1 }, { player: '', level: 1 }, { player: '', level: 1 }],
        [{ player: '', level: 1 }, { player: '', level: 1 }, { player: '', level: 1 }]
    ],
    currentPlayer: 'X',
    step: 0,
    message: '',
    playerInfo: {
        X: {
            items: [2, 2, 2],
            level: 1
        },
        O: {
            items: [2, 2, 2],
            level: 1
        }
    }
}
function reducer(state, action) {
    switch (action.type) {
        case 'reset':
            console.log(initialState)
            return JSON.parse(JSON.stringify(initialState));
        case 'setTicTacToeMap':
            return { ...state, ticTacToeMap: action.payload };
        case 'changeCurrentPlayer':
            return { ...state, currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X' };
        case 'setStep':
            return { ...state, step: action.payload };
        case 'setMessage':
            return { ...state, message: action.payload };
        case 'setPlayerLevel': {
            const { level } = action.payload;
            return {
                ...state, playerInfo: {
                    ...state.playerInfo,
                    [state.currentPlayer]: {
                        ...state.playerInfo[state.currentPlayer],
                        level: level
                    }
                }
            };
        }
        case 'setPlayerLevelItems': {
            const { player, level, value } = action.payload;
            const newPlayerItems = [...state.playerInfo[player].items];
            newPlayerItems[level] = value;
            return {
                ...state, playerInfo: {
                    ...state.playerInfo,
                    [player]: {
                        ...state.playerInfo[player],
                        items: newPlayerItems
                    }
                }
            }
        }
        case 'decreasePlayerLevelItems': {
            const currentPlayerLevel = state.playerInfo[state.currentPlayer].level;
            const newPlayerItems = [...state.playerInfo[state.currentPlayer].items];
            newPlayerItems[currentPlayerLevel-1]--;
            return {
                ...state, playerInfo: {
                    ...state.playerInfo,
                    [state.currentPlayer]: {
                        level: currentPlayerLevel,
                        items: newPlayerItems
                    }
                }
            }
        }
        default:
            return state;

    }
}

export const useTicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, JSON.parse(JSON.stringify(initialState)));

    const onPlayerClick = (rowIndex, colIndex) => () => {
        if(state.message.length > 0) return;
        const newTicTacToeMap = [...state.ticTacToeMap];
        const targetPoint = newTicTacToeMap[rowIndex][colIndex];
        const currentLevel = state.playerInfo[state.currentPlayer].level;
        if(state.playerInfo[state.currentPlayer].items[currentLevel-1] === 0){
            console.log('no item')
            return;
        }
        if (targetPoint.player !== '' && targetPoint.level >= currentLevel ) return;
        targetPoint.player = state.currentPlayer;
        targetPoint.level = currentLevel;

        dispatch({ type: 'setTicTacToeMap', payload: newTicTacToeMap });
        dispatch({ type: 'setStep', payload: state.step + 1 });
        dispatch({ type: 'decreasePlayerLevelItems' });
        dispatch({ type: 'changeCurrentPlayer' });
    }
    const onResetGame = () => {
        dispatch({ type: 'reset' });
    }
    const onSetPlayerLevel = (level, playerName) => () => {
        if (state.currentPlayer !== playerName ||state.playerInfo[playerName].items[level-1]===0) return;
        dispatch({ type: 'setPlayerLevel', payload: { level } });
    }
    useEffect(() => {
        const previousPlayer = state.currentPlayer === 'O' ? 'X' : 'O';
        for (let i = 0; i < WinningPoints.length; i++) {
            for (let j = 0; j < WinningPoints[i].length; j++) {
                let [row, col] = WinningPoints[i][j];
                if (state.ticTacToeMap[row][col].player !== previousPlayer) {
                    break;
                }
                if (j === 2) {
                    dispatch({ type: 'setMessage', payload: `${previousPlayer} win` });

                    break;
                }
            }
        }

        //check if draw or not
        if (state.step === 12 && state.message.length === 0) {
            dispatch({ type: 'setMessage', payload: 'Draw' });
        }
    }
        , [state.currentPlayer, state.message, state.step, state.ticTacToeMap]);



    return { onResetGame, onSetPlayerLevel, onPlayerClick, state, dispatch };

}