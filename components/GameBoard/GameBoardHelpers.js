
/** exports:
              composeGameboardRow,
              getRow,
              rowIsFull,
              addRowToGameboard,
              resetLetterByIndex,
              charIndexExists,
              setCharToLetter
*/

import useGameboard, {composeGameboardRow} from './classes/useGameboard'

export const getActiveChar = (gameboardState) => {
  const [activeChar] = gameboardState.chars.filter(c => c.key === gameboardState.activeChar);
  return activeChar
}

export const getActiveCharStatus = (gameboardState) => {
  return getActiveChar(gameboardState).status
}

export const getActiveCharLetter = (gameboardState) => {
  return getActiveChar(gameboardState).letter
}

export const activeCharIsBlank = (gameboardState) => {
  const char = getActiveChar(gameboardState)
  return char.letter === '' ? true : false;
} 

/**
 * Get a row!
 * @param  {} gameboardState -- a gameboard state
 * @param  {} rowNumber - the nth row
 */
export const getRow = (gameboardState, rowNumber) => {
  return gameboardState.chars.filter( char => char.row === rowNumber)
}
/**
 * Check if a row is full
 * @param  {} gameboardState -- a gameboard state
 * @param  {} rowNumber -- a row
 */
export const rowIsFull = (gameboardState, rowNumber) => {
  const row = getRow(gameboardState, rowNumber)
    .filter( char => char.letter != '') // has a letter
  
  return gameboardState.slots === row.length
}

export const rowIsNotFull = (gameboardState, rowNumber) => {
  return !rowIsFull(gameboardState, rowNumber)
}

export const addRowToGameboard = (gameboard) => {
  let newGameboard = {...gameboard}
  Object.setPrototypeOf( newGameboard, useGameboard.prototype );
  const blankRow = composeGameboardRow(gameboard.rows, gameboard.slots)

  const newRow = getLastRowGreens(gameboard)
    .map( char => { 
      blankRow[char.slot].status = 3
      blankRow[char.slot].letter = char.letter
    })

  newGameboard.chars = newGameboard.chars.concat(blankRow)
  newGameboard.rows++
  return newGameboard
}

export const getLastRowGreens = (gameboard) => {
  return gameboard.chars
    .filter( char => char.row === gameboard.rows - 1 ) // get the last row
    .filter( char => char.status == 3) // get the greens
}

export const resetLetterByIndex = (gameboard, i) => {
    const letter = gameboard.chars[i]
    letter.letter = ''
    letter.status = 0
    
    const newChars =  [...gameboard.chars]  // an array    
    newChars[i] = letter

    return {...gameboard, chars: newChars }
}

export const charIndexExists = (gameboard, i) => {
  return typeof(gameboard.chars[i]) === "undefined" ? false : true;
}
