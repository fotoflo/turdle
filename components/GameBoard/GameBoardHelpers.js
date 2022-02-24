
/** exports:
              generateNewGameboardState,
              composeGameboardRow,
              getRow,
              rowIsFull,
              addRowToGameboard,
              resetLetterByIndex,
              charIndexExists,
              setCharToLetter
*/

/**
 * constructor for the gameboard state
 * @param  {} word - a seed word, to know the length
 * @param  {} rows - the number of rows to create
 * @param  {} startingRow=0 
 */
export const generateNewGameboardState = (word, rows = 1, startingRow = 0) => {
  if(!word){ console.trace(`GenerateNewGameBoardState no word`); return }
  const slots = word.length
  const newGameboardState = { word, rows, slots}
  
  let chars = []
  for(let i = startingRow; i < rows + startingRow ; i++){
    chars = chars.concat(composeGameboardRow(i, slots))
  }

  newGameboardState.chars = chars;

  return newGameboardState
}
/**
 * Create a new gameboard state
 * @param  {} rowNumber - start at this row
 * @param  {} slots - row has this many slots
 */
export const composeGameboardRow = (rowNumber, slots) =>{
  const row = []
  let index = rowNumber * slots;
  for(let i = 0; i < slots; i++){
    const key = `row-${rowNumber}__slot-${i}`
    row.push(
      {
        key,
        index,
        row : rowNumber,
        slot : i,
        letter : "",
        status: 0
      }
    )
    index++;
  }

  return row
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

export const addRowToGameboard = (gameBoard) => {
  let newGameboard = {...gameBoard}

  const blankRow = composeGameboardRow(gameBoard.rows, gameBoard.slots)
  newGameboard.chars = newGameboard.chars.concat(blankRow)
  newGameboard.rows++
  return newGameboard
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

export const setCharToLetter = (gameboard, char, letter) =>{
  letter = letter.toLowerCase()
  
  const newChar = char;
  newChar.letter = letter
  newChar.status = iterateStatus( newChar.status, letter )  
  gameboard.chars[newChar.index] = newChar;

  return gameboard
}

export function iterateStatus(number, pressedKey){
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