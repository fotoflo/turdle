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

Array.prototype.findWordsWithLettersInSlots = function (letterSlotPairs){
  if( letterSlotPairs.length === 0 ) return this
  if( Object.keys(letterSlotPairs).length === 0 ) return this

  return this.filter( word => {
    return letterSlotPairs.every( (pair) => {
      return word.charAt(pair.slot) === pair.letter 
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

export const getLetterSlotPairsByStatusFromCharsArray = (chars, status) =>{
  return chars
    .filter( c => c.status === status) // 3 means its a pair
    .map( c => { return { letter: c.letter, slot: c.slot }})
}

export const filterWordList = (wordList, chars) => {

  let excludedList =  getLetterSlotPairsByStatusFromCharsArray(chars, 1)
  excludedList = excludedList.map( c => c.letter ).join("")

  let includedList =  getLetterSlotPairsByStatusFromCharsArray(chars, 2)
  includedList = includedList.map( c => c.letter ).join("")
  // [{letter: "h", slot:0},{letter: "i", slot:1}] -> "hi"

  const inSlotList = getLetterSlotPairsByStatusFromCharsArray(chars, 3)


  console.log(`****** FILTERING ******`)
  console.log(`finding words with with letter in slot: ${JSON.stringify(inSlotList)}`)
  console.log(`finding words including: ${JSON.stringify(includedList)}`)
  console.log(`finding words excluding: ${JSON.stringify(excludedList)}`)

  const newWordList = wordList
    .findWordsWithLettersInSlots(inSlotList)
    .findWordsWithChars(includedList)
    .findWordsWithoutChars(excludedList)

  const l = 20;
  const elipses = newWordList.length > l ? "..." : "";

  return `${ l < newWordList.length  ? l : newWordList.length }/${newWordList.length}: ` 
    + newWordList.slice(0,l).join(" ") 
    + elipses;
}