import React, { useEffect, useState } from "react";
import Head from 'next/head'


import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "../components/Themes";

import GameBoard from '../components/GameBoard';

import { getWordList } from "../appHelpers";

const DEFAULT_WORD_LENGTH = 5;

// wordlist comes from getServerSideProps
// theme, showHints, setShowhings comes from _app.js
function Index({wordList, theme, showHints, wordLength }) {

  const [word, setWord] = useState("hello");

  useEffect( () => {
    const theWord = generateRandomWord()
    console.log(`the word is ${theWord}`)
    setWord(theWord)
  }, [])

  const generateRandomWord = ( ) => {
    const min = 0;
    const max =  wordList.length -1;
    const rand =  Math.floor(Math.random() * (max - min + 1) + min)
    const theWord = wordList[rand]
    return theWord
  }
  
  return (
    <>
    <Head>
      <title>WordCheater - The Wordle Solver</title>
    </Head>
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    <GlobalStyles />
        <GameBoard 
            wordList={wordList}
            word={word}
            showHints={showHints}
        />
    </ThemeProvider>
    </>
  );
}


// Return the Wordlist
export async function getServerSideProps() { 
  // Call an external API endpoint to get posts.
  // You can use any data fetching library

  const wordList = await getWordList(DEFAULT_WORD_LENGTH)

  console.log(' getStaticProps - wordList.length: ', wordList.length)
  // By returning { props: { wordList } }, the component
  // will receive `wordList` as a prop at build time
  return {
    props: {
      wordList,
    },
  }
}

export default Index;