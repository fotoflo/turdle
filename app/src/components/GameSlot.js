import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import {  Col } from 'react-bootstrap';

function GameLetter({slot, gameRow, activeLetter, setActiveLetter, gameState, setGameState } ){

    const letterValue = Object.keys(gameState[slot])[0]
    // const letterState = gameState[slot][letterValue] || 0;

    return (
      <Col onClick={ () => setActiveLetter(slot) }>
        <SlotBox 
          className="col" 
          slot={slot}
          gameRow={gameRow}
          activeletter={activeLetter}
          // letterstate={letterState}
        >
          {/* {letterValue}: {letterState} */}
        </SlotBox>
        <span>{slot}</span>
      </Col>
    )
    
}

const SlotBox = styled.div`
  border: ${(props) => { return props.slot === props.activeletter ? 3 : 1 }}px
      solid ${(props) => { return props.slot === props.activeletter ? "red" : "grey" }
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