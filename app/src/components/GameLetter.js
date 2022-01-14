import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import {  Col } from 'react-bootstrap';

function GameLetter({order, activeLetter, setActiveLetter, gameState, setGameState } ){

    const letterValue = Object.keys(gameState[order])[0]
    const letterState = gameState[order][letterValue] || 0;

    return (
      <Col onClick={ () => setActiveLetter(order) }>
        <LetterBox 
          className="col" 
          order={order}
          activeletter={activeLetter}
          letterstate={letterState}
        >
          {letterValue}:
          {letterState}
        </LetterBox>
        <span>{order}</span>
      </Col>
    )
    
}

const LetterBox = styled.div`
  border: ${(props) => { return props.order === props.activeletter ? 3 : 1 }}px
      solid ${(props) => { return props.order === props.activeletter ? "red" : "grey" }
    };
  background-color: ${ (props) =>  props.theme[props.letterstate]   };
  height: 10rem;
`
    


GameLetter.propTypes = {
  order: PropTypes.number.isRequired,
  activeLetter: PropTypes.number.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
  gameState: PropTypes.array.isRequired,
  setGameState: PropTypes.func.isRequired
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default GameLetter