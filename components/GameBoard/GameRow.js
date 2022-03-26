import React from 'react';
import PropTypes from 'prop-types';

import GameSlot from './GameSlot'
import styled from 'styled-components';

// import {FaSignOutAlt} from 'react-icons/fa'

function GameRow({gameRow, gameboardState, ...props}){

    const squareSide = `${100}px`

    return (
        <SlotRow id={`row-${gameRow}`}
          data-testid={`row-${gameRow}`}
          squareSide={squareSide}
          >
          { 
            Array(gameboardState.slots).fill(0).map(
              (e,j)=>{
                return <GameSlot
                  
                  key={`row-${gameRow}__slot-${j}`}
                  gameboardState={gameboardState}
                  gameRow={gameRow}
                  gameSlot={j}
                  squareSide={squareSide}
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
  height: ${props => props.squareSide};
  line-height: 55px;
  font-size: 3rem;
  text-align: center;
  margin-bottom: 20px;
`

GameRow.propTypes = {
  setActiveChar: PropTypes.func.isRequired,
}

export default GameRow