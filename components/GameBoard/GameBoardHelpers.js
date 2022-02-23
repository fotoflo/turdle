// exports
/**
    generateNewGameboardState
    composeGameboardRow
    getRow
    isRowFull
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
  let chars = []
  const newGameboardState = { word, rows, slots}
  
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
export const isRowFull = (gameboardState, rowNumber) => {
  const row = getRow(gameboardState, rowNumber)
    .filter( char => char.letter != '') // has a letter
  
  return gameboardState.slots === row.length
}