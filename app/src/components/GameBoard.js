import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from './Keyboard';
import HintPanel from './HintPanel/HintPanel';


// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameBoard({showHints, ...props}){

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })

    const generateNewGameboardState = (rows = 1, startingRow = 0) => {
      const word = "hello"
      const slots = word.length
      const chars = []
      

      /// we want to be able to do chars.filter( char => char.key === "row-2__slot-1" )
      /// and chars.filter( char => char.letter === "e" ) etc
      // for (row in chars.map( char => chars.row) ) console.log(row)
      //
      // we also want to be able to generate the <Row><Slot /><Slot /><Slot /></Row> rows based on the count
      const newGameboardState = { word, rows, slots, chars}

      let index = startingRow * slots;

      for(let i = startingRow; i < rows + startingRow ; i++){
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
        }
      }

      return newGameboardState
    }

    const newGameboardState = generateNewGameboardState()
    
    const [activeLetter, setActiveLetter] = useState("row-0__slot-0") // set of {0,1,2,3,4,5}
    const [gameboardState, setGameboardState] = useState(newGameboardState)
    
    function iterateStatus(number){
      const max = 3;
      return number < max ? number+1 : 0;
    }

    function indexOfActiveLetter(){
      return gameboardState.chars.filter( c => c.key === activeLetter)[0].index;
    }

    function nextActiveLetter(){
      const i = indexOfActiveLetter()
      setActiveLetter(gameboardState.chars[i+1].key)
    }
    function prevActiveLetter(){
      const i = indexOfActiveLetter()
      setActiveLetter(gameboardState.chars[i-1].key)
    }

    function prevActiveRow(){
      const i = indexOfActiveLetter()
      setActiveLetter(gameboardState.chars[i-gameboardState.slots].key)
    }
    
    function nextActiveRow(){
      const i = indexOfActiveLetter()
      setActiveLetter(gameboardState.chars[i+gameboardState.slots].key)
    }

    function resetActiveLetter(){
      const i = indexOfActiveLetter()
      const letter = gameboardState.chars[i]
      letter.letter = ''
      letter.status = 0
      
      const newChars =  [...gameboardState.chars]  // an array    
      newChars[i] = letter

      setGameboardState({...gameboardState, chars: newChars })
    }


    function keydownHandler( {key: pressedKey} ){

      console.log(pressedKey)

      switch(true){
        case pressedKey === " ":
        case pressedKey === "Tab":
        case pressedKey === "ArrowRight" :
          nextActiveLetter()
          return;
        case pressedKey === "ArrowLeft":
          prevActiveLetter()
          return;
        case pressedKey === "ArrowDown":
          nextActiveRow()
          return;
        case pressedKey === "ArrowUp":
          prevActiveRow()
          return;
        case pressedKey === "Backspace":
        case pressedKey === "Delete":
          resetActiveLetter()
          return;
        case !pressedKey.match(/^[a-zA-Z]{1}$/):
          return;
        default:
          break;
      }
      
      pressedKey = pressedKey.toLowerCase()

      const newChars =  [...gameboardState.chars]  // an array    
      const [newLetter] = gameboardState.chars.filter(c => c.key === activeLetter);
      
      newLetter.letter = pressedKey
      newLetter.status = iterateStatus( newLetter.status )  
      
      // set the new letter
      newChars[newLetter.index] = newLetter
      gameboardState.chars = newChars

      setGameboardState({...gameboardState, chars: newChars})
    }

    function addRowToGameboard(){
      const currentRows = gameboardState.rows
      let newGameboardState = Object.assign({}, gameboardState)

      const blankRows = generateNewGameboardState(1, newGameboardState.rows)
      newGameboardState.chars = newGameboardState.chars.concat(blankRows.chars)
      newGameboardState.rows++
      debugger
      setGameboardState(newGameboardState)
    }

    return (
      <Container>
          { showHints === true &&
            <HintPanel 
              gameboardState={gameboardState}
            />  
          }
          
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

          <Button onClick={addRowToGameboard} />

          <Keyboard 
            gameboardState={gameboardState}
            keydownHandler={keydownHandler}
          />
      </Container>
    )
}

GameBoard.propTypes = {
  showHints: PropTypes.bool,
}

export default GameBoard