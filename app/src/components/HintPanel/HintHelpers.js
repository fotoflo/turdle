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

export const findWordsWithoutChars = (wordlist, chars) => {
  const charsRegex = new RegExp(`[${chars}]`)
  return wordlist.filter(  word => !word.match(charsRegex) )
}
// // letter in slot
// // get all the gamestate 3s 
// const inSlot = gameState
//   .filter(gameLetter => Object.keys(gameLetter)[0] === 3 )
//   .map( letterCount => letterCount[0] )  //  [t, 1] return t
//   .join('') // join 

// const loc = 0;
// const char = 'f';

// const charInLocation = withoutChar.filter(
//   (word) => word[loc] === char
// )

// const results = charInLocation.join(" ")