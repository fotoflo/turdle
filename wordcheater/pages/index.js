import React, { useEffect, useState } from "react";
import Head from 'next/head'


import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "../components/Themes";

import GameBoard from '../components/GameBoard';


// wordlist comes from getServerSideProps
// theme, showHints, setShowhings comes from _app.js
function Index({wordList, theme, showHints, setShowHints }) {

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
            setShowHints={setShowHints}
        />
    </ThemeProvider>
    </>
  );
}

// Return the Wordlist
export async function getStaticProps() { 
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3000/api/wordlist?wordlength=5')
  const wordList = await res.json()

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