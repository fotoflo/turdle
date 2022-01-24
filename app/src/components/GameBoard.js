import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Container, Row } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from './Keyboard';
import HintPanel from './HintPanel/HintPanel';
import styled from 'styled-components';


// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameBoard(...props){

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })

    const word = "hello"

    const generateNewGameboardState = () => {
      const rows = 5
      const slots = word.length
      const chars = []
      
      const newGameboardState = { rows, slots, chars}

      let index = 0;

      for(let i = 0; i < rows; i++){
        for(let j = 0; j < slots; j++){
          const key = `row-${i}__slot-${j}`
          chars.push(
            {
              key,
              index,
              row : i,
              slot : j,
              letter : "",
              status: 0
            }
          )
          index++;

          /// we want to be able to do chars.filter( char => char.key === "row-2__slot-1" )
          /// and chars.filter( char => char.letter === "e" ) etc
          // for (row in chars.map( char => chars.row) ) console.log(row)
          //
          // we also want to be able to generate the <Row><Slot /><Slot /><Slot /></Row> rows based on the count
        }
      }

      return newGameboardState
    }

    const newGameboardState = generateNewGameboardState()
    
    const [activeLetter, setActiveLetter] = useState("row-0__slot-0") // set of {0,1,2,3,4,5}
    const [gameboardState, setGameboardState] = useState(newGameboardState)
    const [keyboardState, setKeyboardState] = useState({});
    

    function iterateStatus(number){
      const max = 3;
      return number < max ? number+1 : 0;
    }

    function keydownHandler( {key: pressedKey} ){
      if( !pressedKey.match(/^[a-zA-Z]{1}$/)  ) return;
      pressedKey = pressedKey.toLowerCase()

      let newGameboardState =  Object.assign({}, gameboardState);
      let [newLetter] = newGameboardState.chars.filter(c => c.key==activeLetter);

      newLetter.letter = pressedKey

      newGameboardState.chars[newLetter.index] = newLetter
      debugger
      
      setGameboardState(newGameboardState)

      // const currentStatus = newGameboardState[activeLetter][pressedKey] || 0

      // const newStatus = iterateStatus( currentStatus )  

      // newGameboardState[activeLetter] = {
      //   // [pressedKey]: newStatus
      // }

      // const newKeyboardState = {
      //   ...keyboardState,
      //   [pressedKey]: newStatus // order matters, here we overwrite the ...keyboardState on the pressedKey
      // }

      // setGameboardState(newGameboardState)
      // setKeyboardState(newKeyboardState) 
    }

    return (
      <Container>
          <HintPanel 
            newGameboardState={newGameboardState}
            keyboardState={keyboardState}
          />

          <InfoBox>GameboardState = {JSON.stringify(gameboardState)}</InfoBox>
          
          { 
            Array(gameboardState.rows).fill(0).map(
              (e,i)=>{
                return <GameRow 
                  key={`gameRow-${i}`}
                  gameboardState={gameboardState}
                  activeLetter={activeLetter}
                  setActiveLetter={setActiveLetter}
                  gameRow={i}
                i/>
              })

          }

          <p>activeLetter: {activeLetter}</p>
          <p>keyboardState: {JSON.stringify(keyboardState)}</p>

          <Keyboard 
            keyboardState={keyboardState}
            keydownHandler={keydownHandler}
          />
      </Container>
    )
}

const InfoBox = styled.div`
  border: 1px solid grey;
  background-color: ivory;
  height: 8rem;
  font-size: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`
    


GameBoard.propTypes = {
  str: PropTypes.string,
}

export default GameBoard