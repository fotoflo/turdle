import { useState } from "react"

export class Gameboard {
  constructor(word = "word", rows = 1, startingRow = 0){
    if(!word){ console.trace(`gameboard requires a word`); return }
    
    this.rows = rows
    this.slots = word.length
    this.word = word
    this.activeChar = 'row-0__slot-0'
    
    this.chars = []
    for(let i = startingRow; i < rows + startingRow ; i++){
      this.chars = this.chars.concat(composeGameboardRow(i, this.slots))
    }
 
    return this
  }
}

export default function useGameboard(){
  return useState(new Gameboard())
}

/**
 * constructor for the gameboard state
 * @param  {} word - a seed word, to know the length
 * @param  {} rows - the number of rows to create
 * @param  {} startingRow=0 
 */
 export const generateNewGameboardState = (word, rows = 1, startingRow = 0) => {
  if(!word){ console.trace(`GenerateNewGameBoardState no word`); return }
  const slots = word.length
  const newGameboardState = { activeChar: 'row-0__slot-0', word, rows, slots}
  
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
