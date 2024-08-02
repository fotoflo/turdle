import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { fetchWordlist } from "../../helpers/staticFetcher";
import useSWR from "swr";
import generateRandomWord from "../../helpers/generateWord.js";

function useWord({ wordLength, fallback }) {
  const clientSideFetcher = () => fetchWordlist(wordLength);

  const setSwrKey = () => {
    return `wordlist-${wordLength}`;
  };

  const key = setSwrKey();

  const { data: wordlist, mutate } = useSWR(key, clientSideFetcher, {
    fallbackData: fallback["/api/wordlist"],
  });

  const [word, setWord] = useState(generateRandomWord(wordlist));

  const wordRef = useRef(word);

  return { word, setWord, wordRef, mutateWord: mutate, wordlist, key };
}

export default useWord;
