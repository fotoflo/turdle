import wordList from '../../FiveLetterWords.json'

export const getCharsFromKeyboardState = (keyboardState, state) => {
  return Object.entries(keyboardState)
  .filter( letterCount => letterCount[1] === state ) // [t, 2] get all entries with 2
  .map( letterCount => letterCount[0] )  //  [t, ...] array return t
  .join('') // join 
} 

export const findWordsWithChars  = (wordList, chars) => {
  const charsRegex = new RegExp(`[${chars}]`)
  return wordList.filter(  word => word.match(charsRegex)  )
}

export const findWordsWithoutChars = (wordList, chars) => {
  const charsRegex = new RegExp(`[${chars}]`)
  return wordList.filter(  word => !word.match(charsRegex) )
}

export const findWordsWithCharInSlot = (wordList, CharSlotPairs) => {
  let newList = [];

  CharSlotPairs  // [{x:0}, {r:4}]
    .map( (pair) => {
      const char = Object.keys(pair)[0]
      const slot = pair[char]
      const filteredList = wordList.filter(  word => word[slot] === char ) 
      newList = newList.concat( filteredList )
    })
  console.log(`newList: ${newList}`)
  return newList
}