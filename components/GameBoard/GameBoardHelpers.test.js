const assert = require('assert')
import {
  generateNewGameboardState,
  composeGameboardRow,
  getRow,
  rowIsFull,
  addRowToGameboard,
  resetLetterByIndex,
  charIndexExists,
  activeCharIsBlank
} from "./GameBoardHelpers";

const blankCharsRow = [
  {
    key: 'row-0__slot-0',
    index: 0,
    row: 0,
    slot: 0,
    letter: '',
    status: 0
  },
  {
    key: 'row-0__slot-1',
    index: 1,
    row: 0,
    slot: 1,
    letter: '',
    status: 0
  }
]

const secondBlankCharsRow = [
  {
    key: 'row-1__slot-0',
    index: 2,
    row: 1,
    slot: 0,
    letter: '',
    status: 0
  },
  {
    key: 'row-1__slot-1',
    index: 3,
    row: 1,
    slot: 1,
    letter: '',
    status: 0
  }
]

describe( 'generateNewGameboardState', ()=>{

	it(`should return a gameboard state`, () => {
    const result = generateNewGameboardState("hi")
    // console.log({chars: result.chars})
    expect(result).toMatchObject({
      word: "hi",
      rows: 1,
      slots: 2,
      chars: blankCharsRow
    })
	}) 

  it(`should return a gameboard state with correct rows and slots`, () => {
    const result = generateNewGameboardState("hi", 2)
    // console.log({chars: result.chars})
    expect(result).toMatchObject({
      word: "hi",
      rows: 2,
      slots: 2,
      chars: blankCharsRow.concat(secondBlankCharsRow)
    })
	}) 
})


describe( 'composeGameboardRow', ()=>{

	it(`should return a gameboard row with the right number of slots`, () => {
    const result = composeGameboardRow(0, 2)
    // console.log(`composeGameboardRow - ` + {result})
    expect(result).toMatchObject(blankCharsRow)
	}) 


  it(`should work for the nth row gameboard row, index starting at zero`, () => {
    const result = composeGameboardRow(1, 2)
    console.log(`composeGameboardRow(2,2) - ` + {result})
    expect(result).toMatchObject(secondBlankCharsRow)
	}) 
})

describe( 'getRow', ()=>{

  const myGameboardState = generateNewGameboardState("hi", 3)

	it(`should return the first row when asked`, () => {
    const result = getRow(myGameboardState, 0)
    expect(result).toMatchObject(blankCharsRow)
	}) 


	it(`should return [] if the row doesnt exist`, () => {
    const result = getRow(myGameboardState, 9)
    expect(result).toEqual([])
	}) 


  it(`should return the second row when asked`, () => {
    const result = getRow(myGameboardState, 1)
    expect(result).toMatchObject(secondBlankCharsRow)
	}) 
})



describe( 'rowIsFull', ()=>{
  const myGameboardState = generateNewGameboardState("hi", 3)
  myGameboardState.chars[0].letter = "h"
  myGameboardState.chars[1].letter = "i"
  myGameboardState.chars[2].letter = "i"

	it(`should return true if row is full of letters`, () => {
    const result = rowIsFull(myGameboardState, 0)
    expect(result).toBe(true)
	}) 


  it(`should return false if row has any empty letters`, () => {
    const result = rowIsFull(myGameboardState, 1)
    expect(result).toBe(false)
	}) 
})


describe( 'addRowToGameboard', ()=>{
  const myGameboardState = generateNewGameboardState("hi")
  myGameboardState.chars[0].letter = "h"
  myGameboardState.chars[1].letter = "i"

	it(`should add a row to the gameboard`, () => {
    const newGameboardState = addRowToGameboard(myGameboardState)
    expect(newGameboardState.chars[2]).toMatchObject({  key: 'row-1__slot-0', })
    expect(newGameboardState.rows).toBe(2)
	}) 

})

describe('resetLetterByIndex(gameboardState, index)', ()=>{
  it("should reset the indicated letter", ()=>{
    const myGameboardState = generateNewGameboardState("hi")
    myGameboardState.chars[0].letter = "h"
    myGameboardState.chars[0].status = 3

    const newGameboardState = resetLetterByIndex(myGameboardState, 0)
    expect(newGameboardState.chars[0].letter).toEqual('')
    expect(newGameboardState.chars[0].status).toEqual(0)
  })
})


describe('charIndexExists(gameboard, index)', ()=>{
  const myGameboardState = generateNewGameboardState("hi")

  it("should return true if the char exists", ()=>{
    const result = charIndexExists(myGameboardState, 1)
    expect(result).toBe(true)
  })

  it("should return false if the char doesn't exists", ()=>{
    const result = charIndexExists(myGameboardState, 8)
    expect(result).toBe(false)
  })
})

describe('activeCharIsBlank(gameboard)', ()=>{
  const myGameboardState = generateNewGameboardState("hi")
  myGameboardState.chars[0].letter = 'h'
  myGameboardState.chars[0].status = 3
  
  it("should return false if the char has a letter", ()=>{
    assert(myGameboardState.activeChar == 'row-0__slot-0')
    const result = activeCharIsBlank(myGameboardState)
    expect(result).toBe(false)
  })

  it("should return true if the char doesn't have a letter", ()=>{
    myGameboardState.activeChar = 'row-0__slot-1'
    const result = activeCharIsBlank(myGameboardState)
    expect(result).toBe(true)
  })
})