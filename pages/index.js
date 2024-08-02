// index.js page appearing at ://wordcheater.app/
import Head from "next/head";

import GameboardComponent from "../components/Gameboard/GameboardComponent";
import NavBar from "../components/NavBar";
import { WordComponent } from "../components/WordComponent";

import { DEFAULT_WORD_LENGTH, DEBUG_MODE } from "../next.config";

import LevelUpModal from "../components/LevelUpModal";
import { useGameState } from "../components/hooks/useGameState";
import { fetchWordlist, staticFetcher } from "../helpers/staticFetcher";
import useWord from "../components/hooks/useWord";

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
    levelUp,
    showLevelUpModal,
    levelUpModalToggler,
    wordLengthToggler,
  } = useGameState();

  const { word, wordRef, wordlist } = useWord({
    wordLength,
    fallback,
    level,
  });

  const closeLevelUpModal = () => {
    wordRef.current = word;
    console.log("####$$$$##### setting wordref to ", word);
    levelUpModalToggler();
  };

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
        word={word}
        wordList={wordlist}
        showHints={showHints}
        setShowHints={setShowHints}
        levelUpModalToggler={levelUpModalToggler}
        level={level}
        levelUp={levelUp}
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
