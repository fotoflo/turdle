Array.prototype.findWordsWithChars = function(chars){
  let regexStr = ''
  chars.split("").forEach( char => regexStr += `(?=.*${char})` )
  // const charsRegex = new RegExp(/(?=.*x)(?=.*e)\w/, 'g');
  const charsRegex = new RegExp(`${regexStr}\\w`, 'g')
  return this.filter(  word => word.match(charsRegex)  )
}


Array.prototype.findWordsWithoutChars = function (chars){
  const charsRegex = new RegExp(`[${chars}]`)
  return this.filter(  word => !word.match(charsRegex) )
}

Array.prototype.findWordsWithCharsInSlots = function (charSlotPairs){
  if( charSlotPairs.length === 0 ) return this
  if( Object.keys(charSlotPairs).length === 0 ) return this

  return this.filter( word => {
    return charSlotPairs.every( (pair) => {
      return word.charAt(pair.slot) === pair.char 
    })
  })
}

Array.prototype.findWordsWithoutCharsInSlots = function (charSlotPair){
  //  charSlotPairs: {char: r, slot: 4}
  return this  // wordlist = ['xenon', 'rewax', 'roger', 'bob']
    .filter(  word => word[charSlotPair.slot] !== charSlotPair.char ) 
}


export const getKeyValueFromPair = (pair) => {
  const char = Object.keys(pair)[0]
  const slot = pair[char]
  return [char, slot]
}

export const getLetterSlotPairsFromCharsArray = (chars, status) =>{
  return chars
    .filter( c => c.status === status)
    .map( c => { return { letter: c.letter, slot: c.slot }})
}

// export const filterWordList = (wordList, gameboardState, keyboardState) => {
  //  const charSlotPairs = getCharSlotPairsFromCharsArrayByStatus(gameboardState.chars)

//   const includedList = getCharsFromKeyboardState(keyboardState, 2)
//   const excludedList = getCharsFromKeyboardState(keyboardState, 1)

  
// console.log(`finding words with charSlotPair: ${JSON.stringify(charSlotPairs)}`)
// console.log(`finding words with non Match: ${JSON.stringify(nonMatchList)}`)
// console.log(`finding words included: ${JSON.stringify(includedList)}`)
// console.log(`finding words excluded: ${JSON.stringify(excludedList)}`)

//   const newWordList = wordList
//   .findWordsWithCharsInSlots(charSlotPairs)
//   .findWordsWithChars(includedList)

//   const l = 20;
//   const elipses = newWordList.length > l ? "..." : "";

//   return `${l}/${newWordList.length}: ` 
//     + newWordList.slice(0,l).join(" ") 
//     + elipses;
// }