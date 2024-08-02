import { useEffect, useRef, useState } from "react";
import { fetchWordlist } from "../../helpers/staticFetcher";
import useSWR from "swr";
import generateRandomWord from "../../helpers/generateWord.js";

function useWord({ wordLength, fallback, level }) {
  const clientSideFetcher = () => fetchWordlist(wordLength);

  const setSwrKey = () => {
    return `wordlist-${wordLength}`;
  };

  const key = setSwrKey();

  const { data: wordlist, mutate: mutateWord } = useSWR(
    key,
    clientSideFetcher,
    {
      fallbackData: fallback["/api/wordlist"],
    }
  );

  const [word, setWord] = useState(generateRandomWord(wordlist));
  const wordRef = useRef(word);

  useEffect(() => {
    console.log(`mutating to new key: ${key}`);
    mutateWord(key).then((wordlist) => {
      if (!wordlist) return;
      setWord(generateRandomWord(wordlist));
      console.log(
        `### ${wordLength} letter wordlist changed - ${wordlist[0].length} - letter words`
      );
    });
  }, [level, wordLength]);

  return { word, setWord, wordRef, mutateWord, wordlist, key };
}

export default useWord;
