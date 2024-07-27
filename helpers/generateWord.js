export default function generateRandomWord(wordlist) {
  const min = 0;
  const max = wordlist.length - 1;
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  const theWord = wordlist[rand];
  return theWord;
}
