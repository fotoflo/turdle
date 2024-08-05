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

  const wordlistFetcher = () => fetchWordlist(wordLength);

  const [level, setLevel] = useState(0);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

  const { data: wordlist, mutate: mutateWord } = useSWR(key, wordlistFetcher, {
    fallbackData: fallbackWordlist["/api/wordlist"],
  });

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

  useEffect(() => {
    if (level == 0) return;

    mutateWord(key).then((wordlist) => {
      if (!wordlist) return;

      const newWord = generateRandomWord(wordlist);
      setWord(newWord);
      wordRef.current = newWord;
    });
  }, [level, wordLength]);

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
