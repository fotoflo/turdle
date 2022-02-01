import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

function GameLetter({gameSlot, gameboardState, gameRow, activeLetter, setActiveLetter, ...props } ){

    const slotKey = `row-${gameRow}__slot-${gameSlot}`
    const slotIndex = ( gameRow * gameboardState.slots ) + gameSlot
    const char = gameboardState.chars[slotIndex];

    return (
        <SlotBox 
          onClick={ () => setActiveLetter(slotKey) }
          gameboardState={gameboardState}
          activeLetter={activeLetter}
          
          char={char}

          gameSlot={gameSlot}
          gameRow={gameRow}
          
          slotIndex={slotIndex}
          slotKey={slotKey}
          // letterstate={letterState}
        >
          {char.letter.toUpperCase()}
        </SlotBox>
    )
    
}

const SlotBox = styled.div`
  border: ${(props) => { return props.slotKey === props.activeLetter ? 3 : 1 }}px
      solid ${(props) => { return props.slotKey === props.activeLetter ? "red" : "grey" }
    };
  background-color: ${ (props) =>  props.theme[props.char.status]   };
  height: 100%;
  width: 100%;
  font-size: 3rem;
  text-align: center;
  margin: 10px;
`
    

GameLetter.propTypes = {
  gameSlot: PropTypes.number.isRequired,
  gameRow:  PropTypes.number.isRequired,
  activeLetter: PropTypes.string.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
  gameboardState: PropTypes.object.isRequired
}

export default GameLetter