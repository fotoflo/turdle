// index.js page appearing at ://wordcheater.app/
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import useSWR from "swr";

import GameboardComponent from "../components/Gameboard/GameboardComponent";
import NavBar from "../components/NavBar";
import { WordComponent } from "../components/WordComponent";

import {
  BASE_URL,
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
  DEFAULT_WORD_LENGTH,
  DEBUG_MODE,
} from "../next.config";

import { Wordlist } from "../components/Gameboard/Classes/Wordlist";
import LevelUpModal from "../components/LevelUpModal";
import { useGameState } from "../components/hooks/useGameState";
import { fetchWordlist, staticFetcher } from "../helpers/staticFetcher";
import generateRandomWord from "../helpers/generateWord";

// wordlist comes from getServerSideProps
// theme, showHints, setShowhings comes from _app.js

// MAIN COMPONENT DEF
function Index({
  theme,
  themeToggler,
  helpModalToggler,
  showHints,
  setShowHints,
  hintToggler,
  fallback,
}) {
  const {
    wordLength,
    level,
    showLevelUpModal,
    setLevel,
    levelUpModalToggler,
    wordLengthToggler,
  } = useGameState();

  const closeLevelUpModal = () => {
    wordRef.current = word;
    console.log("####$$$$##### seeting wordref to ", word);
    levelUpModalToggler();
  };

  const clientSideFetcher = () => fetchWordlist(wordLength);

  const setKey = () => {
    if (level === 0 && wordLength == DEFAULT_WORD_LENGTH) return null;
    return `/api/wordlist?wordlength=${wordLength}`;
  };

  const key = setKey();

  const { data: wordlist, mutate } = useSWR(key, clientSideFetcher, {
    fallbackData: fallback["/api/wordlist"],
  });

  const [word, setWord] = useState(generateRandomWord(wordlist));
  const wordRef = useRef(word);

  useEffect(() => {
    console.log(`mutating to new key: ${key}`);
    mutate(key).then((wordlist) => {
      if (!wordlist) return;
      setWord(generateRandomWord(wordlist));
      console.log(
        `### ${wordLength} letter wordlist changed - ${wordlist[0].length} - letter words`
      );
    });
  }, [level, wordLength, key, mutate]);

  return (
    <>
      <Head>
        <title>WordCheater - The Wordle Solver</title>
      </Head>
      <NavBar
        theme={theme}
        themeToggler={themeToggler}
        helpModalToggler={helpModalToggler}
        hintToggler={hintToggler}
        wordLength={wordLength}
        wordLengthToggler={wordLengthToggler}
      />
      <WordComponent
        showWord={DEBUG_MODE}
        word={word}
        wordlist={wordlist}
        level={level}
      />
      <LevelUpModal
        closeLevelUpModal={closeLevelUpModal}
        showLevelUpModal={showLevelUpModal}
        wordRef={wordRef}
      />
      <GameboardComponent
        levelUpModalToggler={levelUpModalToggler}
        word={word}
        wordList={wordlist}
        showHints={showHints}
        setShowHints={setShowHints}
        wordLengthToggler={wordLengthToggler}
        level={level}
        setLevel={setLevel}
      />
    </>
  );
}

// Send the wordList to props
export async function getStaticProps(context) {
  const wordlist = await fetchWordlist(DEFAULT_WORD_LENGTH);

  const props = {
    fallback: {
      "/api/wordlist": wordlist,
    },
  };
  return { props };
}

export default Index;
