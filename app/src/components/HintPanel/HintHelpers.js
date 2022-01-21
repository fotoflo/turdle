
export const getCharsFromKeyboardState = (keyboardState, state) => {
  return Object.entries(keyboardState)
    .filter( letterCount => letterCount[1] === state ) // [t, 2] get all entries with 2
    .map( letterCount => letterCount[0] )  //  [t, ...] array return t
    .join('') // join 
} 

export const getKeyValuePairsByValueFromGameState = (gameState, value) => {

  return gameState
    .filter( pair =>{
      const [k, v] = getKeyValueFromPair(pair)
      return v === value
    } )
} 

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

  debugger

  return this.filter( word => {
    return charSlotPairs.every( (pair) => {
      debugger
      return word.charAt(pair.slot) === pair.char 
    })
  })
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

export const getCharSlotPairsFromGameState = (gameState)=>{
  //gamestate = [{"v":3},{},{},{"u":3},{}] , return the v and u
  //gamestate = [{"v":1},{},{},{"u":2},{}], return []
  const charSlotPairs = gameState.map( (slot, index) => {
    debugger
    return {
      "slot": index,
      "char": Object.keys(slot)[0]
    } || null
  })

  return charSlotPairs.filter( (pair) => typeof(pair.char) !== 'undefined')
  // return charSlotPairs //[{"char":"v","slot":0},{"char":"u","slot":3}] 
}

export const filterWordList = (wordList, gameState, keyboardState) => {
  const charSlotPairs = getCharSlotPairsFromGameState(gameState)
  const nonMatchList = getKeyValuePairsByValueFromGameState(gameState,1)
  const includedList = getCharsFromKeyboardState(keyboardState, 2)
  const excludedList = getCharsFromKeyboardState(keyboardState, 1)

  
console.log(`finding words with charSlotPair: ${JSON.stringify(charSlotPairs)}`)
console.log(`finding words with non Match: ${JSON.stringify(nonMatchList)}`)
console.log(`finding words included: ${JSON.stringify(includedList)}`)
console.log(`finding words excluded: ${JSON.stringify(excludedList)}`)

  const newWordList = wordList
  .findWordsWithCharsInSlots(charSlotPairs)
  .findWordsWithChars(includedList)

  const l = 20;
  const elipses = newWordList.length > l ? "..." : "";

  return `${l}/${newWordList.length}: ` 
    + newWordList.slice(0,l).join(" ") 
    + elipses;
}