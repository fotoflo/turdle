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
  IS_DEV_ENV
} from "../next.config";

const WORDLIST_BASEURL = `${BASE_URL}/api/wordlist`;
console.log("WORDLIST BASEURL: ", WORDLIST_BASEURL)

// wordlist comes from getServerSideProps
// theme, showHints, setShowhings comes from _app.js
function Index({
  theme,
  themeToggler,
  helpModalToggler,
  showHints,
  setShowHints,
  hintToggler
}) {
  
  
  const [word, setWord] = useState("hello");
  const [showWord] = useState(IS_DEV_ENV);
  console.log("IS_DEV_ENV", IS_DEV_ENV, typeof(IS_DEV_ENV))
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

const useWordList = async () => {
  const SWRkey = `/api/wordlist?wordlength=${DEFAULT_WORD_LENGTH}`
  const res = await fetch(`${BASE_URL}${SWRkey}`)
  return { 
   SWRkey: SWRkey,
   wordList: await res.json()
  }
}

// Send the wordList to props
export async function getServerSideProps() { 
  const {wordList, SWRkey} = await useWordList()
  console.info('getStaticProps GOT WORDLIST - wordList.length: ', wordList.length)

  // By returning { props: { wordList } }, the component
  // will receive `wordList` as a prop at build time
  const props = { fallback: {}}
  props.fallback[SWRkey] = wordList
  return { props }
}

export default Index;