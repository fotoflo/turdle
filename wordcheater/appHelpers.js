export const getWordList = async (wordLength) => {
  const res = await fetch(`http://localhost:3000/api/wordlist?wordlength=${wordLength}`)
  const wordList = await res.json()

  console.log(`getWordList got the ${wordLength} letter wordList` , wordList)

  return wordList;
}
