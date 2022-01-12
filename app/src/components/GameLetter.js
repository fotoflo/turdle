import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Card, Col } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameLetter({order, activeLetter, setActiveLetter, gameState, setGameState } ){

    return (
      <Col onClick={ () => setActiveLetter(order) }>
        <LetterBox className="col"/>
        <span>{order}</span>
      </Col>
    )
}

const LetterBox = styled(Card)`
  border: 1px solid ${ (props) => props.order === props.activeLetter ? "yellow" : "grey"  };
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