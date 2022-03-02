/*eslint-disable no-extend-native */

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

Array.prototype.findWordsWithCharsButNotInSlot = function (letterSlotPairs){
  /// has the letter, but not in the slot
  // arrow has w, but not in slot 1
  if( letterSlotPairs.length === 0 ) return this
  if( Object.keys(letterSlotPairs).length === 0 ) return this

  const charsString = letterSlotPairs.map(pair => pair.letter).join()

  return this.findWordsWithChars(charsString)
    .filter( word => {
    return letterSlotPairs.every( (pair) => {
        return word.charAt(pair.slot) !== pair.letter 
      })
    })
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


const formatWordListAsHints = (wordList, maxHints) =>{

  const requiresElipses = wordList.length > maxHints
  const hintList = wordList.slice(0,maxHints).join(" ")

  if(requiresElipses){
    return {
      hintInfo: `Showing ${maxHints} of ${wordList.length} hints:`, 
      hintList: `${hintList}...`
    }
  }

  return {
    hintInfo: `${wordList.length} hints:`,
    hintList: hintList
  }
}

export const getHints = (wordList, chars, maxHints) =>{
  const hintList = filterWordList(wordList, chars) 
  return formatWordListAsHints(hintList, maxHints)
}

export const filterWordList = (wordList, chars) => {
  
  const inSlotList = getLetterSlotPairsByStatusFromCharsArray(chars, 3)

  const excludedList =  getLetterSlotPairsByStatusFromCharsArray(chars, 1)
  const excludedCharString = excludedList.map( c => c.letter ).join("")

  const includedList =  getLetterSlotPairsByStatusFromCharsArray(chars, 2)
  // [{letter: "h", slot:0},{letter: "i", slot:1}] -> "hi"



  console.log(`****** FILTERING ******`)
  console.log(`finding words with with letter in slot: ${JSON.stringify(inSlotList)}`)
  console.log(`finding words excluding: ${JSON.stringify(excludedCharString)}`)
  console.log(`finding words including: ${JSON.stringify(includedList)}`)

  // debugger

  const newWordList = wordList
    .findWordsWithLettersInSlots(inSlotList)
    .findWordsWithCharsButNotInSlot(includedList)
    .findWordsWithoutChars(excludedCharString)

  return newWordList
}