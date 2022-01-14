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

    function iterate(number){
      const max = 3;
      return number < max ? number+1 : 0;
    }

    function keydownHandler( {key: pressedKey} ){
      if( !pressedKey.match(/^[a-zA-Z]{1}$/)  ) return;
      pressedKey = pressedKey.toLowerCase()

      let newState = [...gameState];

      newState[activeLetter] = {
        ...gameState[activeLetter],
        [pressedKey]: iterate( newState[activeLetter][pressedKey] )  // order matters, here we overwrite the ...gamestate
      }

      setGameState(newState) 
    }

    return (
      <Container>
          <GameRow
            gameState={gameState}
            setGameState={setGameState}
            activeLetter={activeLetter}
            setActiveLetter={setActiveLetter}
          />

          <Keyboard 
            gameState={gameState}
            setGameState={setGameState}
            keydownHandler={keydownHandler}
          />
          <p>activeLetter: {activeLetter}</p>
      </Container>
    )
}


GameBoard.propTypes = {
  str: PropTypes.string,
}

export default GameBoard