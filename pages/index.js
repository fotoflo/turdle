import React, { useEffect, useState } from "react";
import Head from 'next/head'

import useSWR from 'swr'

import { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "../components/Themes";

import GameBoard from '../components/GameBoard/GameBoard';
import NavBar from '../components/NavBar';
import {WordComponent} from '../components/WordComponent';

import { 
  BASE_URL,
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
  DEFAULT_WORD_LENGTH
} from "../next.config";

const WORDLIST_BASEURL = `${BASE_URL}/api/wordlist`;
console.log("WORDLIST BASEURL: ", WORDLIST_BASEURL)
const fetcher = (...args) => fetch(...args).then(res => res.json());

// wordlist comes from getServerSideProps
// theme, showHints, setShowhings comes from _app.js
function Index({
  theme,
  themeToggler,
  modalToggler,
  showHints,
  setShowHints,
  hintToggler
}) {
  
  
  const [word, setWord] = useState("hello");
  const [showWord, setShowWord] = useState(true);
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  const wordlistUrl = `${WORDLIST_BASEURL}?wordlength=${wordLength}`

  const { data: wordList, error } = useSWR(wordlistUrl, fetcher)
  
  
  useEffect(()=>{
    if(!wordList){
      setWord("hello")
      return
    }
    const theWord = generateRandomWord()
    console.log(`the word is ${theWord}`)
    setWord(theWord)
  }, [wordList])
  
  if(error) return(
    <div className="error">
      <p className="error-message">Error: failed to load wordlist</p>
      <p>Detail: {JSON.stringify(error)}</p>
    </div>
  )

  if(!wordList) return <div>loading wordlist...</div>

  const wordLengthToggler = () => {
    wordLength < MAX_WORD_LENGTH ?
       setWordLength( wordLength + 1) :
       setWordLength( MIN_WORD_LENGTH ) ;
  }
  

  const generateRandomWord = () => {
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
    <GlobalStyles theme={theme}/>
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
    <NavBar
        theme={theme}
        themeToggler={themeToggler}
        modalToggler={modalToggler}
        hintToggler={hintToggler}
        wordLength={wordLength}
        wordLengthToggler={wordLengthToggler}
      />
      
      <WordComponent
        showWord={showWord}
        word={word}
      />

      <GameBoard 
          word={word}
          wordList={wordList}
          showHints={showHints}
          setShowHints={setShowHints}
          setWordLength={setWordLength}
      />
    </ThemeProvider>
    </>
  );
}


// // Return the Wordlist
// export async function getServerSideProps() { 
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library

//   const res = await fetch(`http://localhost:3000/api/wordlist?wordlength=${wordLength}`)
//   const wordList = await res.json()

//   console.log(' getStaticProps - wordList.length: ', wordList.length)
//   // By returning { props: { wordList } }, the component
//   // will receive `wordList` as a prop at build time
//   return {
//     props: {
//       wordList,
//     },
//   }
// }

export default Index;