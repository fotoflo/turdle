import { render, screen } from '@testing-library/react';
// import HintPanel from './HintPanel';
import the_wordlist from '../../FiveLetterWords.json'

import {
  getCharsFromKeyboardState,
  getKeyValuePairsByValueFromGameState,
  //Array.prototype.findWordsWithChars,
  //Array.prototype.findWordsWithoutChars,
  //Array.prototype.findWordsWithCharInSlot,
  //Array.prototype.findWordsWithoutCharInSlot,
  //Array.prototype.indexOfObject(obj)
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

describe( 'findWordsWithChars', ()=>{
  const chars = "x";
  const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words that have the chars" `, () => {
    const result = wordlist.findWordsWithChars(chars)
    console.log(result)
    expect( result.sort() ).toEqual( [ 'xenon', 'rewax' ].sort() )
	}) 
})

describe( 'findWordsWithoutChars', ()=>{
  const chars = "x";
  const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words that dont have the chars" `, () => {
    let result = wordlist.findWordsWithoutChars( chars)
    expect( result.sort() ).toEqual( [ 'roger', 'bob' ].sort() )
	}) 
})

describe( 'Array.prototype.findWordsWithCharInSlot', ()=>{
  const charSlotPair = {char: "x", slot: 0};
  const wordlist = ['xenon', 'rewax', 'roger', 'bob', 'xylophone']

	it(`it should return a list of words have the right char in the right slot" `, () => {
    const result = wordlist.findWordsWithCharInSlot(charSlotPair)
    expect( result.sort() ).toEqual( [ 'xylophone', 'xenon' ].sort() )
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
})

describe( 'Array.prototype.indexOfObject(obj)', ()=>{
  const gameState = [{"r":2},{"o":1},{"g":1},{"u":1},{"e":3}, {"f":4}]
  it(`should return the index of the matching object" `, () => {
    const result = gameState.indexOfObject({e:3})
    expect( result ).toEqual( 4 )
	}) 
})


describe.skip( 'filterWordList', ()=>{
  const gameState = [{"r":2},{"o":1},{"g":1},{"u":1},{"e":3}]
  const keyboardState =  {"t":0,"r":2,"i":0,"o":1,"g":1,"u":1,"e":3,"c":1}
  const wordlist = the_wordlist;

	it(`it should return a list of words have the right char in the right slot" `, () => {
    const result = filterWordList(wordlist, gameState, keyboardState)
    console.log("RESULT:", result)
    expect( result ).toEqual( [ 'roger', 'xenon' ] )
	}) 
})

