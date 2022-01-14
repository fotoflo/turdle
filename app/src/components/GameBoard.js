import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from './Keyboard';


// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameBoard(...props){

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })

    const [activeLetter, setActiveLetter] = useState(0) // set of {0,1,2,3,4,5}
    const [gameState, setGameState] = useState([{},{},{},{},{}]);
    const [keyboardState, setKeyboardState] = useState({});

    function iterate(number){
      const max = 2;
      return number < max ? number+1 : 0;
    }

    function keydownHandler( {key: pressedKey} ){
      if( !pressedKey.match(/^[a-zA-Z]{1}$/)  ) return;
      pressedKey = pressedKey.toLowerCase()

      let newGameState = [...gameState];

      newGameState[activeLetter] = {
        ...gameState[activeLetter],
        [pressedKey]: iterate( newGameState[activeLetter][pressedKey] )  // order matters, here we overwrite the ...gamestate
      }

      const newKeyboardState = {
        ...keyboardState,
        [pressedKey]: iterate( newGameState[activeLetter][pressedKey] )
      }

      setGameState(newGameState)
      setKeyboardState(newKeyboardState) 
    }

    return (
      <Container>
          <GameRow
            gameState={gameState}
            setGameState={setGameState}
            activeLetter={activeLetter}
            setActiveLetter={setActiveLetter}
          />
          <p>activeLetter: {activeLetter}</p>
          <p>keyboardState: {JSON.stringify(keyboardState)}</p>

          <Keyboard 
            keyboardState={keyboardState}
            keydownHandler={keydownHandler}
          />
      </Container>
    )
}


GameBoard.propTypes = {
  str: PropTypes.string,
}

export default GameBoard