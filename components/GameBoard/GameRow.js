import React, {useRef} from 'react';
import PropTypes from 'prop-types';

import GameSlot from './GameSlot'
import styled from 'styled-components';
import useSize from '../useSize';

// import {FaSignOutAlt} from 'react-icons/fa'

function GameRow({gameRow, gameboardState, ...props}){


  const targetRef = useRef();
  const {width} = useSize(targetRef)
  const margin = 10
  const squareSide = `${( width / (gameboardState.slots) - margin ) }px`
  console.log({squareSide})
  

  console.log(`width: ${width}, squareSide: ${squareSide}, margin: ${margin}`)

    return (
        <SlotRow id={`row-${gameRow}`}
          data-testid={`row-${gameRow}`}
          squareSide={squareSide}
          ref={targetRef}
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
                  margin={margin}
                  {...props} 
                />
              })

          }
        </SlotRow>
    )
}

const SlotRow = styled.div`
  display: flex;
  justifyContent: bottom;
  height: ${props => props.squareSide};
  line-height: ${props => props.squareSide};
  font-size: ${props => props.squareSide};
  text-align: center;
  margin-bottom: 20px;
`

GameRow.propTypes = {
  setActiveChar: PropTypes.func.isRequired,
}

export default GameRow