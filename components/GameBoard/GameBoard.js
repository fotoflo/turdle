import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from '../Keyboard';
import HintPanel from '../HintPanel/HintPanel';
import styled from 'styled-components';

import {
  generateNewGameboardState,
  resetLetterByIndex,
  addRowToGameboard,
  charIndexExists,
  rowIsFull
} from './GameBoardHelpers';

function GameBoard({word, showHints, ...props}){

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })

    const [activeLetter, setActiveLetter] = useState("row-0__slot-0") // set of {0,1,2,3,4,5}
    const [gameboardState, setGameboardState] = useState( generateNewGameboardState(word) )

    useEffect( ()=>{
      setGameboardState( generateNewGameboardState(word) )
    },[word])
    
    function iterateStatus(number, pressedKey){
      // if hints are on, iterate through the statuses
      if(showHints === true){
        const max = 3;
        return number < max ? number+1 : 0;
      }else{
        // check the statuses
        const slot = activeLetter[ activeLetter.length - 1 ] // we onlys support 0-9 aka 10 letter words
        if(word[slot] === pressedKey){
            // they match, set status to 3, green
            return 3
        } else if( word.indexOf(pressedKey) !== -1 ) {
          // the letter is in a dfferent slot, set status to 2, yellow
            return 2
        } else { // the letter is not in the word,  set status to 1, gray
          return 1
        }
      }
    }

    function indexOfActiveLetter(){
      return gameboardState.chars.filter( c => c.key === activeLetter)[0].index;
    }

    function nextActiveLetter(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(gameboardState, i+1)) return 
      setActiveLetter(gameboardState.chars[i+1].key)
    }

    function prevActiveLetter(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(gameboardState, i-1)) return 
      setActiveLetter(gameboardState.chars[i-1].key)
    }
    function prevActiveRow(){
      const i = indexOfActiveLetter()
      if(!charIndexExists(i - gameboardState.slots )) return 
      setActiveLetter(gameboardState.chars[i-gameboardState.slots].key)
    }
    
    function nextActiveRow(){
      const i = indexOfActiveLetter()
      if(charIndexExists(i+gameboardState.slots) === "undefined") return 
      setActiveLetter(gameboardState.chars[i+gameboardState.slots].key)
    }

    function resetActiveLetter(){
      const i = indexOfActiveLetter()
      const newGameboardState = resetLetterByIndex(gameboardState, i)
      setGameboardState(newGameboardState)
    }


    function keydownHandler( {key: pressedKey} ){

      console.log(pressedKey, word)

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
        case pressedKey === "⌫":
          resetActiveLetter()
          return;
        case !pressedKey.match(/^[a-zA-Z]{1}$/):
          return;
        default:
          break;
      }
      
      pressedKey = pressedKey.toLowerCase()
      
      let newGameboard = {...gameboardState};
      const newChar = getActiveChar(newGameboard)
      
      newChar.letter = pressedKey
      newChar.status = iterateStatus( newChar.status, pressedKey )  
      
      // set the new letter
      newGameboard.chars[newChar.index] = newChar
     
      if( rowIsFull(newGameboard, newGameboard.rows - 1 ) ){
        newGameboard = addRowToGameboard(newGameboard)
      }

      setGameboardState({...newGameboard})
      nextActiveLetter()
    }

    const getActiveChar = (gameboard) => {
      const [activeChar] = gameboard.chars.filter(c => c.key === activeLetter);
      return activeChar
    }

    return (
      <GameBoardContainer id="GameBoardContainer">
          {/* {word} */}
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

          <Keyboard 
            gameboardState={gameboardState}
            keydownHandler={keydownHandler}
          />
      </GameBoardContainer>
    )
}

const GameBoardContainer = styled(Container)`
`

GameBoard.propTypes = {
  showHints: PropTypes.bool,
}

export default GameBoard