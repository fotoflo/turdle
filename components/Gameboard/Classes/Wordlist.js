export class Wordlist extends Array{
  constructor(...args){
    super(...args)
  }

  filter(...args){
    return super.filter(...args)
  }

  findWordsWithChars(chars){
    let regexStr = ''
    chars.split("").forEach( char => regexStr += `(?=.*${char})` )
    // const charsRegex = new RegExp(/(?=.*x)(?=.*e)\w/, 'g');
    const charsRegex = new RegExp(`${regexStr}\\w`, 'g')
    return this.filter(  word => word.match(charsRegex)  )
  }

  findWordsWithoutChars(chars){
    const charsRegex = new RegExp(`[${chars}]`)
    return this.filter(  word => !word.match(charsRegex) )
  }

  findWordsWithoutCharsInSlots(charSlotPair){
    //  charSlotPairs: {char: r, slot: 4}
    return this  // wordlist = ['xenon', 'rewax', 'roger', 'bob']
      .filter(  word => word[charSlotPair.slot] !== charSlotPair.char ) 
  }
  
  findWordsWithCharsButNotInSlot(letterSlotPairs){
    /// has the letter, but not in the slot
    // arrow has w, but not in slot 1
    if( letterSlotPairs.length === 0 ) return this
    if( Object.keys(letterSlotPairs).length === 0 ) return this
  
    return this.filter( word => {
      const pairs = letterSlotPairs
        .filter( char => word.indexOf(char.letter) !== -1 ) 
        .filter( char => word.indexOf(char.letter) !== char.slot )
      return pairs.length === 0 ? false: true;
    })
  }

  findWordsWithLettersInSlots(letterSlotPairs){
    if( letterSlotPairs.length === 0 ) return this
    if( Object.keys(letterSlotPairs).length === 0 ) return this
  
    return this.filter( word => {
      return letterSlotPairs.every( (pair) => {
        return word.charAt(pair.slot) === pair.letter 
      })
    })
  }
}