import { generateNewGameboardState, composeGameboardRow } from "./GameBoardHelpers";

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

const thirdCharsRow = [
  {
    key: 'row-2__slot-0',
    index: 4,
    row: 2,
    slot: 0,
    letter: '',
    status: 0
  },
  {
    key: 'row-2__slot-1',
    index: 5,
    row: 2,
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
})


describe( 'composeGameboardRow', ()=>{

	it(`should return a gameboard row with the right number of slots`, () => {
    const result = composeGameboardRow(0, 2)
    // console.log(`composeGameboardRow - ` + {result})
    expect(result).toMatchObject(blankCharsRow)
	}) 


  it(`should work for the nth row gameboard row`, () => {
    const result = composeGameboardRow(2, 2)
    console.log(`composeGameboardRow(2,2) - ` + {result})
    expect(result).toMatchObject(thirdCharsRow)
	}) 
})

