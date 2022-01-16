import { render, screen } from '@testing-library/react';
// import HintPanel from './HintPanel';
import {getCharsFromKeyboardState,
  findWordsWithChars,
  findWordsWithoutChars,
  findWordsWithCharInSlot
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
    let result = getCharsFromKeyboardState(sampleKeyboardState, 1)
	  expect(result == "qw")
	}) 
})

describe( 'findWordsWithChars', ()=>{
  const chars = "x";
  const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words that have the chars" `, () => {
    let result = findWordsWithChars(wordlist, chars)
    expect( result.sort() ).toEqual( [ 'xenon', 'rewax' ].sort() )
	}) 
})

describe( 'findWordsWithChars', ()=>{
  const chars = "x";
  const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words that dont have the chars" `, () => {
    let result = findWordsWithoutChars(wordlist, chars)
    expect( result.sort() ).toEqual( [ 'roger', 'bob' ].sort() )
	}) 
})

describe.only( 'findWordsWithCharInSlot', ()=>{
  const charSlotPairs = [{x:0}, {r:4}];
  const wordlist = ['xenon', 'rewax', 'roger', 'bob']

	it(`it should return a list of words have the right char in the right slot" `, () => {
    let result = findWordsWithoutChars(wordlist, charSlotPairs)
    expect( result.sort() ).toEqual( [ 'xenon', 'roger' ].sort() )
	}) 
})

