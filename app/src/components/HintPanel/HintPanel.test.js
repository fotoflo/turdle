import { render, screen } from '@testing-library/react';
// import HintPanel from './HintPanel';
import the_wordlist from '../../FiveLetterWords.json'

import {

  //Array.prototype.findWordsWithChars,
  //Array.prototype.findWordsWithoutChars,
  //Array.prototype.findWordsWithLettersInSlots,
  //Array.prototype.findWordsWithoutCharsInSlots,
  getLetterSlotPairsByStatusFromCharsArray,
  filterWordList
} from './HintHelpers';

import '@testing-library/jest-dom';

// describe('inSet', () => {
//   render(<HintPanel />);
//   const titleElement = screen.getByText(/Hints/i);
//   expect(titleElement).toBeInTheDocument();
// });



describe( 'Array.prototype.findWordsWithChars', ()=>{
  const chars = "xe";
  const wordlist = ['xenon', 'rewax', 'roger', 'bob', 'echo', 'xio']

	it(`it should return a list of words that have the chars" `, () => {
    const result = wordlist.findWordsWithChars(chars)
    console.log(result)
    expect( result.sort() ).toEqual( [ 'xenon', 'rewax' ].sort() )
	}) 
})

describe( 'findWordsWithoutChars', ()=>{
  const chars = "xr";
  const wordlist = ['xenon', 'rewax', 'roger', 'bob', 'echo', 'xio']

	it(`it should return a list of words that dont have the chars" `, () => {
    let result = wordlist.findWordsWithoutChars( chars)
    expect( result.sort() ).toEqual( [ 'echo', 'bob' ].sort() )
	}) 
})

describe( 'Array.prototype.findWordsWithLettersInSlots', ()=>{
  const letterSlotPairs = [{letter: "x", slot: 0}, {letter: "y", slot: 1}];
  const wordlist = ['xenon', 'rewax', 'roger', 'bob', 'xylophone']

	it(`it should return a list of words have the right Letter in the right slot" `, () => {
    const result = wordlist.findWordsWithLettersInSlots(letterSlotPairs)
    expect( result.sort() ).toEqual( [ 'xylophone' ].sort() )
	}) 

  it(`it should return the whole list if there are no slot pairs" `, () => {
    const result = wordlist.findWordsWithLettersInSlots({})
    expect( result.sort() ).toEqual( wordlist.sort() )
	}) 
})

describe( 'Array.prototype.findWordsWithoutCharsInSlots', ()=>{
const charSlotPair = {char: "x", slot: 0}
const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words have the right char in the right slot" `, () => {
    const result = wordlist.findWordsWithoutCharsInSlots(charSlotPair)
    expect( result.sort() ).toEqual( [  'rewax', 'roger', 'bob' ].sort() )
	}) 
})


describe( 'getLetterSlotPairsFromCharsArray(gameboardState.chars)', ()=>{
  const chars = [{
                "key":"row-0__slot-0","index":0,"row":0,"slot":0,"letter":"h","status":3
              },{
                "key":"row-0__slot-1","index":1,"row":0,"slot":1,"letter":"i","status":3
              }]

	it(`it should return a list of char/slot pairs from the gameboardState.chars array" `, () => {
    const result = getLetterSlotPairsByStatusFromCharsArray(chars, 3)
    console.log(JSON.stringify(result))
    expect( result ).toEqual( [{letter: 'h', slot:0}, {letter: 'i', slot:1}] ) 
	}) 
})
  

describe.skip( 'filterWordList', ()=>{

	it(`it should return a list of words have the right char in the right slot" `, () => {
    const wordlist = ['xenon', 'rewax', 'roger', 'bob', 'echo', 'xio']
    // const gameState = [{"q":3},{"u":3},{"o":3},{'x': 1},{}] QUOTE
    // const keyboardState = {"q":3,"u":3,"o":3,"t":2,"c":1,"e":1} QUOTE
    
    const gameState = [{"r":3},{"e":3},{"a":2},{"w":2},{"z":0}] // rewax
    const keyboardState = {"r":3,"e":3,"w":2,"a":2,"m":0,"c":1,"z":0,"k":1,"n":1}
    
    const result = filterWordList(wordlist, gameState, keyboardState)
    console.log("RESULT:", result)
    expect( result ).toEqual( [ 'rewax' ] )
	}) 
})

