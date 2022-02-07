import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import GameRow from './GameRow';
import Keyboard from './Keyboard';
import HintPanel from './HintPanel/HintPanel';
import styled from 'styled-components';

function GameBoard({showHints, word, ...props}){

    useEffect( () => {
      window.addEventListener("keydown", keydownHandler);
      return () => {
        window.removeEventListener("keydown", keydownHandler);
      }
    })


    const generateNewGameboardState = (rows = 1, startingRow = 0) => {
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

    function iterateStatus(number, pressedKey){
      if(showHints === true){
        const max = 3;
        return number < max ? number+1 : 0;
      }else{
        console.log(`showHints should be false ${showHints}`)
        console.log(`pressedKey ${pressedKey}`)
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

      const newChars =  [...gameboardState.chars]  // an array    
      const [newLetter] = gameboardState.chars.filter(c => c.key === activeLetter);
      
      newLetter.letter = pressedKey
      newLetter.status = iterateStatus( newLetter.status, pressedKey )  
      
      // set the new letter
      newChars[newLetter.index] = newLetter
      gameboardState.chars = newChars

      setGameboardState({...gameboardState, chars: newChars})
      addRowsToGameboardWhenLastRowIsFull()
    }

    const addRowsToGameboardWhenLastRowIsFull = () => {
      // create and fill rows Array
      const rows = new Array(gameboardState.rows).fill([])
      gameboardState.chars
        .filter( char => char.letter ==='' )
        .map( char => rows[char.row].push(char) )

      // if every char in the last row has a letter
      // add a new row
      if( rows[rows.length-1]
          .every( char => char.letter !== '') )
          {
            addRowToGameboard()
          }
    }


    function addRowToGameboard(){
      let newGameboardState = Object.assign({}, gameboardState)

      const blankRows = generateNewGameboardState(1, newGameboardState.rows)
      newGameboardState.chars = newGameboardState.chars.concat(blankRows.chars)
      newGameboardState.rows++
      setGameboardState(newGameboardState)
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