import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from './Keyboard';

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameBoard(...props){

    const [activeLetter, setActiveLetter] = useState(0)
    const [gameState, setGameState] = useState([
      {
         a: false
      }, 
      {
         b: true
      },
      { },
      {
         d: false, e: false
      },
      {
         d: false,f: false
      }
    ]);
    const [keyboardState, setKeyboardState] = useState({})

    return (
      <Container>
          <GameRow
            gameState={gameState}
            setGameState={setGameState}
            activeLetter={activeLetter}
            setActiveLetter={setActiveLetter}
          />

          <Keyboard 
            keyboardState={keyboardState}
            setKeyboardState={setKeyboardState} 
          />
          <p>activeLetter: {activeLetter}</p>
      </Container>
    )
}


GameBoard.propTypes = {
  str: PropTypes.string,
}

export default GameBoard