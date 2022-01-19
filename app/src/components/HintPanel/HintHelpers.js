import { array } from 'prop-types'
import wordList from '../../FiveLetterWords.json'

export const getCharsFromKeyboardState = (keyboardState, state) => {
  return Object.entries(keyboardState)
    .filter( letterCount => letterCount[1] === state ) // [t, 2] get all entries with 2
    .map( letterCount => letterCount[0] )  //  [t, ...] array return t
    .join('') // join 
} 

export const getKeyValuePairsByValueFromGameState = (gameState, value) => {

  return gameState
    .filter( pair =>{
      const [key, value] = getKeyValueFromPair(pair)
      return value == 3
    } )
} 

Array.prototype.findWordsWithChars = function(chars){
  const charsRegex = new RegExp(`[${chars}]`)
  return this.filter(  word => word.match(charsRegex)  )
}

Array.prototype.findWordsWithoutChars = function (chars){
  const charsRegex = new RegExp(`[${chars}]`)
  return this.filter(  word => !word.match(charsRegex) )
}

Array.prototype.findWordsWithCharInSlot = function (charSlotPair){
  //  charSlotPairs: {char: r, slot: 4}
  return this  // wordlist = ['xenon', 'rewax', 'roger', 'bob']
    .filter(  word => word[charSlotPair.slot] === charSlotPair.char ) 
}

Array.prototype.findWordsWithoutCharInSlot = function (charSlotPair){
  //  charSlotPairs: {char: r, slot: 4}
  return this  // wordlist = ['xenon', 'rewax', 'roger', 'bob']
    .filter(  word => word[charSlotPair.slot] !== charSlotPair.char ) 
}


export const getKeyValueFromPair = (pair) => {
  const char = Object.keys(pair)[0]
  const slot = pair[char]
  return [char, slot]
}

Array.prototype.indexOfObject = function(obj){
  for(let i = 0; i < this.length; i++){
    if(JSON.stringify(this[i]) === JSON.stringify(obj) ){
      return i
    }
  }
}

export const getCharSlotPairsFromExactMatches = (exactMatches) => {
  //exact maches: [{"q":3},{"u":3},{"o":3}]
  return exactMatches.map( (item, index) => {
    const [key] = Object.keys(item)
   return { char: key,  slot : index}
  })
}

export const filterWordList = (wordList, gameState, KeyboardState) => {
  const exactMatches = getKeyValuePairsByValueFromGameState(gameState,3)
  console.log(`Exact matches: ${JSON.stringify(exactMatches)}`)
  const charSlotPairs = getCharSlotPairsFromExactMatches(exactMatches)
  console.log(`charSlotPairs: ${JSON.stringify(charSlotPairs)}`)
  
  const exactMatchWordList = charSlotPairs
    .flatMap(charSlotPair => wordList.findWordsWithCharInSlot(charSlotPair))

  console.log(`exactMatchWordList: ${JSON.stringify(exactMatchWordList)}`)

  return ["list"]
}