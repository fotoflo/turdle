// page appearing at ://wordcheater.app/ 
import React, { useEffect, useState } from "react";
import Head from 'next/head'

import useSWR from 'swr'

import GameBoard from '../components/GameBoard/GameBoard';
import NavBar from '../components/NavBar';
import {WordComponent} from '../components/WordComponent';

import { 
  BASE_URL,
  MIN_WORD_LENGTH,
  MAX_WORD_LENGTH,
  DEFAULT_WORD_LENGTH,
  DEFAULT_SHOW_WORD
} from "../next.config";

const WORDLIST_BASEURL = `${BASE_URL}/api/wordlist`;
console.log("WORDLIST BASEURL: ", WORDLIST_BASEURL)

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
  staticWordlist
}) {
  
  
  const [word, setWord] = useState("hello");
  const [showWord] = useState(DEFAULT_SHOW_WORD);
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  
  const wordlistUrl = `${WORDLIST_BASEURL}?wordlength=${wordLength}`

  const { data: wordList, error } = useSWR(wordlistUrl, fetcher, { 
    fallbackData: staticWordlist,
    revalidateIfStale: true // set to false for testing
  })
  
  
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
    <NavBar
        theme={theme}
        themeToggler={themeToggler}
        helpModalToggler={helpModalToggler}
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
    </>
  );
}


const fetcher = (...args) => fetch(...args).then(res => res.json());

// Send the wordList to props
export async function getServerSideProps() { 
  const res = await fetch(`${WORDLIST_BASEURL}?wordlength=${DEFAULT_WORD_LENGTH}`)
  const staticWordlist = await res.json()

  // By returning { props: { wordList } }, the component
  // will receive `wordList` as a prop at build time
  const props = { staticWordlist}
  return { props }
}

export default Index;