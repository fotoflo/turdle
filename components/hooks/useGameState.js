import { useState, useCallback } from "react";
import {
  DEFAULT_WORD_LENGTH,
  MAX_WORD_LENGTH,
  MIN_WORD_LENGTH,
} from "../../next.config";

export const useGameState = () => {
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  const [level, setLevel] = useState(0);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);

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
    wordLength,
    level,
    showLevelUpModal,
    setLevel,
    levelUp,
    levelUpModalToggler,
    wordLengthToggler,
  };
};
