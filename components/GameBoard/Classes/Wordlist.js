export class Wordlist extends Array{
  constructor(...args){
    super(...args)
  }

  filter(...args){
    return super.filter(...args)
  }

  findWordsWithChars = function(chars){
    let regexStr = ''
    chars.split("").forEach( char => regexStr += `(?=.*${char})` )
    // const charsRegex = new RegExp(/(?=.*x)(?=.*e)\w/, 'g');
    const charsRegex = new RegExp(`${regexStr}\\w`, 'g')
    return this.filter(  word => word.match(charsRegex)  )
  }
}