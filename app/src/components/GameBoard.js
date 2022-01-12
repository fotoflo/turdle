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
    const [gameState, setGameState] = useState([
      {
         r: 1 // a exists
      }, 
      {
         o: 2 // its correct 
      },
      { }, // nothing
      {
         g: 2, e: 2 // both correct
      },
      {
         u: 0 // toggled off
      }
    ]);

    function keydownHandler( {key} ){
      if( !key.match(/^[a-zA-Z]{1}$/)  ) return;
      console.log(key)
    }

    // const toggleActiveLetterState = (char) => {
    //   debugger;
    //   const states = [0, 1, 2] // off, incorrect, correct
    //   console.log(states)
    // }

    // useEffect( ( key ) => {     //   toggleActiveLetterState(key)
    // }, [key] ) ;

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
          />
          <p>activeLetter: {activeLetter}</p>
      </Container>
    )
}


GameBoard.propTypes = {
  str: PropTypes.string,
}

export default GameBoard