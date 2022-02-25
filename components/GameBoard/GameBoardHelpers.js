
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
  const activeLetter = 'row-0__slot-0'
  const newGameboardState = { activeLetter, word, rows, slots}
  
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

export const addRowToGameboard = (gameboard) => {
  let newGameboard = {...gameboard}
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
