import React, {useEffect, useState, useRef} from 'react';

import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from '../Keyboard';
import HintPanel from '../HintPanel/HintPanel';
import styled from 'styled-components';

import Prompt from './Prompt'

import {
  generateNewGameboardState,
  activeCharIsBlank,
  resetLetterByIndex,
  addRowToGameboard,
  charIndexExists,
  rowIsNotFull,
  getLastRowGreens,
  getActiveChar
} from './GameBoardHelpers';

import useGameboard from './Classes/useGameboard'

function GameBoard({
  word,
  wordList,
  showHints,
  setShowHints,
  wordLengthToggler,
  level, 
  setLevel,
  ...props
}){

    const scrollRef = useRef(null)
    const executeScroll = () => scrollRef.current.scrollIntoView()    

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })
    
    const [gameboardState, setGameboardState] = new useGameboard( generateNewGameboardState(word) )

    useEffect(()=>{ // add a row if full
      if( rowIsNotFull(gameboardState, gameboardState.rows - 1 ) ) return

      if( didWinRound(gameboardState) ){
        wonRound()
        return
      }
      
      const newGameboard = addRowToGameboard(gameboardState)
      setGameboardState({
        ...newGameboard,
        activeChar: `row-${newGameboard.rows-1}__slot-0`})
        
      executeScroll()
    },[gameboardState])

    useEffect( ()=>{
      console.log(`word updated, ${word}`)
      setGameboardState( generateNewGameboardState(word) )
    },[word])


    function didWinRound(gameboardState){
      return getLastRowGreens(gameboardState).length === gameboardState.slots 
    }

    function wonRound(){
      alert(`YOU WIN! The word was ${word}`)
      wordLengthToggler()
      setLevel( level + 1)
    }
    
    function iterateStatus(previousStatus, pressedKey){
      // if hints are on, iterate through the statuses
      // if(showHints){
      //   return iterateWithinBounds(previousStatus, 0, 3)
      // }else{
        // check the statuses
        return getLetterStatusForCurrentSlot(pressedKey)
      // }
    }

    function getLetterStatusForCurrentSlot(pressedKey){
      const wordSlot = gameboardState.activeChar.split("-")[2] // get the last char of the key
      if(word[wordSlot] === pressedKey){
          // they match, set status to 3, green
          return 3
      } else if( word.indexOf(pressedKey) !== -1 ) {
        // the letter is in a dfferent slot, set status to 2, yellow
          return 2
      } else { // the letter is not in the word,  set status to 1, gray
        return 1
      }
    }
    
    const setActiveChar = (key) => {
      setGameboardState({...gameboardState, activeChar: key})
    }

    function indexOfactiveChar(){
      return gameboardState.chars.filter( c => c.key === gameboardState.activeChar)[0].index;
    }

    function nextActiveChar(){
      const i = indexOfactiveChar()
      if(!charIndexExists(gameboardState, i+1)) return 
      setActiveChar(gameboardState.chars[i+1].key)
    }

    function prevActiveChar(){
      const i = indexOfactiveChar()
      if(!charIndexExists(gameboardState, i-1)) return 
      setActiveChar(gameboardState.chars[i-1].key)
    }
    function prevActiveRow(){
      const i = indexOfactiveChar()
      if(!charIndexExists(gameboardState, i - gameboardState.slots )) return 
      setActiveChar(gameboardState.chars[i-gameboardState.slots].key)
    }
    
    function nextActiveRow(){
      const i = indexOfactiveChar()
      if(!charIndexExists(gameboardState, i + gameboardState.slots)) return 
      setActiveChar(gameboardState.chars[i+gameboardState.slots].key)
    }

    function resetActiveChar(){
      const i = indexOfactiveChar()
      const newGameboardState = resetLetterByIndex(gameboardState, i)
      setGameboardState(newGameboardState)
    }


    function keydownHandler( {repeat, key: pressedKey} ){
      if(repeat) return
      console.log("keydownHandler", pressedKey, word)

      switch(true){
        case pressedKey === " ":
        case pressedKey === "Tab":
        case pressedKey === "ArrowRight" :
          nextActiveChar()
          return;
        case pressedKey === "ArrowLeft":
          prevActiveChar()
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
          if( activeCharIsBlank(gameboardState) ){
            prevActiveChar() 
            return
          }
          resetActiveChar()
          return;
        case !pressedKey.match(/^[a-zA-Z]{1}$/):
          return;
        default:
          break;
      }
      const activeChar = getActiveChar(gameboardState)
      const newGameboard = setCharToLetter(gameboardState, activeChar, pressedKey)
      setGameboardState({...newGameboard})
      nextActiveChar()
    }

    const setCharToLetter = (gameboard, char, letter) =>{
      letter = letter.toLowerCase()
      
      const newChar = char;
      newChar.letter = letter
      newChar.status = iterateStatus( newChar.status, letter )  
      gameboard.chars[newChar.index] = newChar;

      return gameboard
    }

    const GameRows = () => {
      return Array(gameboardState.rows).fill(0).map(
        (e,i)=>{
          return <GameRow 
            key={`gameRow-${i}`}
            gameboardState={gameboardState}
            setActiveChar={setActiveChar}
            gameRow={i}
          i/>
        })
    }

    return (
      <GameboardContainer data-testid="GameboardContainer" id="GameboardContainer">
          
          <Prompt word={word} level={level} gameboardState={gameboardState}/>

          {  GameRows() }

          <Keyboard 
            gameboardState={gameboardState}
            keydownHandler={keydownHandler}
          />
          <HintPanel
            showHints={showHints}
            wordList={wordList} 
            gameboardState={gameboardState}
          />  
          <FooterScrollRef ref={scrollRef} />
      </GameboardContainer>
    )
}

const GameboardContainer = styled(Container)`
`
const FooterScrollRef = styled.div`
  margin-top: 100px;
`

GameBoard.propTypes = {
  showHints: PropTypes.bool,
}

export default GameBoard