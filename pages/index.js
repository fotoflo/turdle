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
import useWord from "../components/hooks/useWords";

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

  const { word, setWord, wordRef, mutateWord, wordlist, key } = useWord({
    wordLength,
    fallback,
  });

  const closeLevelUpModal = () => {
    wordRef.current = word;
    console.log("####$$$$##### setting wordref to ", word);
    levelUpModalToggler();
  };

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

  if (!word) {
    return <div>Error: No word</div>;
  }

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
