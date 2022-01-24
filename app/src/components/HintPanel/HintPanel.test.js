import { render, screen } from '@testing-library/react';
// import HintPanel from './HintPanel';
import the_wordlist from '../../FiveLetterWords.json'

import {
  getCharsFromKeyboardState,
  getKeyValuePairsByValueFromGameState,
  //Array.prototype.findWordsWithChars,
  //Array.prototype.findWordsWithoutChars,
  //Array.prototype.findWordsWithoutCharInSlot,
  //Array.prototype.indexOfObject(obj),
  getCharSlotPairsFromGameState,
  getCharSlotPairsFromExactMatches,
  getKeyValueFromPair,
  filterWordList
} from './HintHelpers';

import '@testing-library/jest-dom';

// describe('inSet', () => {
//   render(<HintPanel />);
//   const titleElement = screen.getByText(/Hints/i);
//   expect(titleElement).toBeInTheDocument();
// });

describe( 'getCharsFromKeyboardState', ()=>{
  const sampleKeyboardState = {"q":1,"w":1};

	it(`it should return the letters with keyboardState 1" `, () => {
    const result = getCharsFromKeyboardState(sampleKeyboardState, 1)
	  expect(result == "qw")
	}) 
})

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

describe.only( 'Array.prototype.findWordsWithCharsInSlots', ()=>{
  const charSlotPairs = [{char: "x", slot: 0}, {char: "y", slot: 1}];
  const wordlist = ['xenon', 'rewax', 'roger', 'bob', 'xylophone']

	it(`it should return a list of words have the right char in the right slot" `, () => {
    const result = wordlist.findWordsWithCharsInSlots(charSlotPairs)
    expect( result.sort() ).toEqual( [ 'xylophone' ].sort() )
	}) 

  it(`it should return the whole list if there are no slot pairs" `, () => {
    const result = wordlist.findWordsWithCharsInSlots({})
    expect( result.sort() ).toEqual( wordlist.sort() )
	}) 
})

describe( 'Array.prototype.findWordsWithoutCharInSlot', ()=>{
const charSlotPair = {char: "x", slot: 0}
  const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words have the right char in the right slot" `, () => {
    const result = wordlist.findWordsWithoutCharInSlot(charSlotPair)
    expect( result.sort() ).toEqual( [  'rewax', 'roger', 'bob' ].sort() )
	}) 
})

describe( 'getKeyValueFromPair', ()=>{
  const keyValuePair = {x:0}

	it(`should return a key and value from a KeyValuePair" `, () => {
    const result = getKeyValueFromPair(keyValuePair)
    expect( result ).toEqual( [ 'x', 0 ] )
	}) 
})


describe( 'getKeyValuePairsByValueFromGameState', ()=>{
  const sampleGameState = [{w:3},{c:1},{t:1},{u:3},{}];

	it(`it should return the key/value pairs with value 3" `, () => {
    const result = getKeyValuePairsByValueFromGameState(sampleGameState, 3)
	  expect(result.sort() ).toEqual([{w:3}, {u:3}].sort())
	}) 
  it(`it should return the key/value pairs with value 1" `, () => {
    const result = getKeyValuePairsByValueFromGameState(sampleGameState, 1)
	  expect(result.sort() ).toEqual([{c:1},{t:1}].sort())
	}) 
})

describe( 'Array.prototype.indexOfObject(obj)', ()=>{
  const gameState = [{"r":2},{"o":1},{"g":1},{"u":1},{"e":3}, {"f":4}]
  it(`should return the index of the matching object" `, () => {
    const result = gameState.indexOfObject({e:3})
    expect( result ).toEqual( 4 )
	}) 
})


describe( 'getCharSlotPairsFromExactMatches(matches)', ()=>{
  const exactMatches = [{"q":3},{"u":3},{"o":3}]
  it(`should return an array of the slots" `, () => {
    const result = getCharSlotPairsFromExactMatches(exactMatches)
    expect( result ).toEqual( [
      { char: "q", slot: 0}, 
      { char: "u", slot: 1}, 
      { char: "o", slot: 2}
    ] )
	}) 
})

describe.only('getCharSlotPairsFromGameState', ()=> {
  xit('should return charSlotPairs from gameState', ()=>{
    const gameState = [{"v":3},{},{},{"u":3},{}]
    const result = getCharSlotPairsFromGameState(gameState)
    expect( result.sort() ).toEqual( [{"slot":0,"char":'v'},{"slot":3, "char":"u"}] ) 
  })

  it('should return an empty array no slots', () => {
    const gameState = [{"v":1},{},{},{"u":2},{}]
    const result = getCharSlotPairsFromGameState(gameState)
    expect( result ).toEqual( [] ) 
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

