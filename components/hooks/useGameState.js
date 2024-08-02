import { useState, useCallback, useRef, useEffect } from "react";
import {
  DEFAULT_WORD_LENGTH,
  MAX_WORD_LENGTH,
  MIN_WORD_LENGTH,
} from "../../next.config";
import useSWR from "swr";
import generateRandomWord from "../../helpers/generateWord";
import { fetchWordlist } from "../../helpers/staticFetcher";

export const useGameState = (fallbackWordlist) => {
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  const key = `wordlist-${wordLength}`;

  const clientSideFetcher = () => fetchWordlist(wordLength);

  const [level, setLevel] = useState(0);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  const { data: wordlist, mutate: mutateWord } = useSWR(
    key,
    clientSideFetcher,
    {
      fallbackData: fallbackWordlist["/api/wordlist"],
    }
  );

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

  const [word, setWord] = useState(generateRandomWord(wordlist));
  const wordRef = useRef(word);

  const levelUpModalToggler = useCallback(() => {
    setShowLevelUpModal((prev) => !prev);
  }, []);

  const wordLengthToggler = useCallback(() => {
    setWordLength((prevLength) =>
      prevLength < MAX_WORD_LENGTH ? prevLength + 1 : MIN_WORD_LENGTH
    );
  }, []);

  const levelUp = useCallback(() => {
    wordLengthToggler();
    setLevel(level + 1);
  }, []);

  return {
    wordlist,
    word,
    wordRef,
    wordLength,
    level,
    showLevelUpModal,
    setLevel,
    levelUp,
    levelUpModalToggler,
    wordLengthToggler,
  };
};
