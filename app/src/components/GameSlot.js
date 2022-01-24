import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import {  Col } from 'react-bootstrap';

function GameLetter({slot, gameboardState, gameRow, activeLetter, setActiveLetter, ...props } ){

  
    const slotKey = `row-${gameRow}__slot-${slot}`
    // const letterState = gameState[slot][key] || 0;

    return (
      <Col onClick={ () => setActiveLetter(slotKey) }>
        <SlotBox 
          className="col" 
          slotKey={slotKey}
          gameboardState={gameboardState}
          slot={slot}
          gameRow={gameRow}
          activeLetter={activeLetter}
          // letterstate={letterState}
        >
        </SlotBox>
        <span>{slotKey}</span>
      </Col>
    )
    
}

const SlotBox = styled.div`
  border: ${(props) => { debugger; return props.slotKey === props.activeLetter ? 3 : 1 }}px
      solid ${(props) => { return props.slotKey === props.activeLetter ? "red" : "grey" }
    };
  background-color: ${ (props) =>  props.theme[props.letterstate]   };
  height: 6rem;
`
    


// GameLetter.propTypes = {
//   slot: PropTypes.number.isRequired,
//   activeLetter: PropTypes.number.isRequired,
//   setActiveLetter: PropTypes.func.isRequired,
//   gameState: PropTypes.array.isRequired,
//   setGameState: PropTypes.func.isRequired
//   // user: PropTypes.shape({
//   //   phoneNumber: null
//   // })
// }

export default GameLetter