import React from 'react';
import PropTypes from 'prop-types';

import GameSlot from './GameSlot'
import styled from 'styled-components';

// import {FaSignOutAlt} from 'react-icons/fa'

function GameRow({gameRow, gameboardState, ...props}){

    return (
        <SlotRow id={`row-${gameRow}`}>
          { 
            Array(gameboardState.slots).fill(0).map(
              (e,j)=>{
                return <GameSlot
                  key={`row-${gameRow}__slot-${j}`}
                  gameboardState={gameboardState}
                  gameRow={gameRow}
                  gameSlot={j}
                  {...props} 
                />
              })

          }
        </SlotRow>
    )
}

const SlotRow = styled.div`
  display: flex;
  justifyContent: center;
  height: 80px;
  min-height: 80px;
  max-height: 100px;
  margin-bottom: 20px;
`

GameRow.propTypes = {
  activeLetter: PropTypes.string.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
}

export default GameRow