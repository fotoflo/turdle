// import { render, screen } from '@testing-library/react';
// import HintPanel from './HintPanel';
import '@testing-library/jest-dom';
import THREE_LETTER_WORDLIST from '../../dictonaries/3-letter-words.json'

import { 
  Wordlist 
} from '../GameBoard/Classes/Wordlist';

import {
  //Wordlist.filter,
  //Wordlist.findWordsWithoutChars,
  //Wordlist.findWordsWithLettersInSlots,
  //Wordlist.findWordsWithoutLettersInSlots
  //Wordlist.findWordsWithCharsButNotInSlot,
  getLetterSlotPairsByStatusFromCharsArray,
  filterWordList
} from './HintHelpers';

import { TEST_WORD_TWO, TEST_WORD_TXO } from "./HintHelpers.testdata.js"

describe('Wordlist.filter', ()=>{
  it('should filter an array', ()=>{
    const wordlist = new Wordlist('hello', 'rhubarb')
    const result = wordlist.filter(word => word === 'rhubarb')

    expect(result.length).toEqual(1)
    expect(result[0]).toEqual("rhubarb")
    expect(result instanceof Wordlist).toBe(true)
  })
})

describe( 'Wordlist.findWordsWithChars', ()=>{
  const chars = "xe";
  const wordlist = new Wordlist('xenon', 'rewax', 'roger', 'bob', 'echo', 'xio')

	it(`should return a list of words that have the chars`, () => {
    const result = wordlist.findWordsWithChars(chars)
    console.log({result})

    expect( [...result].sort() )
      .toEqual( ['xenon', 'rewax'].sort() )
	}) 
})

describe( 'Wordlist.findWordsWithoutChars', ()=>{
  const chars = "xr";
  const wordlist = new Wordlist('xenon', 'rewax', 'roger', 'bob', 'echo', 'xio')

	it(`should return a list of words that dont have the chars`, () => {
    let result = wordlist.findWordsWithoutChars( chars)
    expect( [...result].sort() ).toEqual( [ 'echo', 'bob' ].sort() )
	}) 
})

describe( 'Wordlist.findWordsWithLettersInSlots', ()=>{
  const letterSlotPairs = [{letter: "x", slot: 0}, {letter: "y", slot: 1}];
  const wordlist = new Wordlist('xenon', 'rewax', 'roger', 'bob', 'xylophone')

	it(`should return a list of words have the right Letter in the right slot`, () => {
    const result = wordlist.findWordsWithLettersInSlots(letterSlotPairs)
    expect( [...result].sort() ).toEqual( [ 'xylophone' ].sort() )
	}) 

  it(`should return the whole list if there are no slot pairs`, () => {
    const result = wordlist.findWordsWithLettersInSlots({})
    expect( result.sort() ).toEqual( wordlist.sort() )
	}) 
})

describe( 'Wordlist.findWordsWithCharsButNotInSlot', ()=>{
  const letterSlotPairs = [{letter: "a", slot: 1}];
  const wordlist = new Wordlist('japan','happy','thank','gamma','tampa','manga')

	it(`should return a list of words have the right Letter in the right slot`, () => {
    const result = wordlist.findWordsWithCharsButNotInSlot(letterSlotPairs)
    expect([...result]).toEqual( [ 'thank' ])
	}) 

  it(`should return the whole list if there are no slot pairs`, () => {
    const result = wordlist.findWordsWithLettersInSlots({})
    expect( [...result].sort() ).toEqual( [...wordlist].sort() )
	}) 
})

describe( 'Wordlist.findWordsWithoutCharsInSlots', ()=>{
const charSlotPair = {char: "x", slot: 0}
const wordlist = new Wordlist('xenon', 'rewax', 'roger', 'bob')

	it(`should return a list of words have the right char in the right slot`, () => {
    const result = wordlist.findWordsWithoutCharsInSlots(charSlotPair)
    expect( [...result].sort() ).toEqual( ['rewax', 'roger', 'bob' ].sort() )
	}) 
})


describe( 'getLetterSlotPairsFromCharsArray(gameboardState.chars)', ()=>{
  const chars = [{
                "key":"row-0__slot-0","index":0,"row":0,"slot":0,"letter":"h","status":3
              },{
                "key":"row-0__slot-1","index":1,"row":0,"slot":1,"letter":"i","status":3
              }]

	it(`should return a list of char/slot pairs from the gameboardState.chars array`, () => {
    const result = getLetterSlotPairsByStatusFromCharsArray(chars, 3)
    console.log(JSON.stringify(result))
    expect( result ).toEqual( [{letter: 'h', slot:0}, {letter: 'i', slot:1}] ) 
	}) 
})
  

describe( 'filterWordList', ()=>{

	it(`should return a list of words have the right char in the right slot`, () => {
    const chars = TEST_WORD_TWO;
    const wordlist = new Wordlist(...THREE_LETTER_WORDLIST)

    const result = filterWordList(wordlist, chars)
    console.log("RESULT:", result)
    expect( result ).toEqual( [ 'two' ] )
	})

  it('should work if there are two letters not in a slot', ()=>{
    const chars = TEST_WORD_TXO;
    const wordlist = new Wordlist(...THREE_LETTER_WORDLIST)
    const result = filterWordList(wordlist, chars)
      console.log("RESULT:", result)
    expect( result ).toEqual( [ 'two', 'too' ] )
  })
})