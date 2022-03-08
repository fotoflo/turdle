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
import { Wordlist } from "../components/GameBoard/Classes/Wordlist";

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
  
  const clientSideFetcher = async (...args) => {
    const res = await fetch(...args)
    const data = await res.json()
    console.log(`clientSideFetcher feched ${data.length} words`)
    return new Wordlist(...data)
  }
  
  const [word, setWord] = useState("hello");
  const [showWord] = useState(DEFAULT_SHOW_WORD);
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);
  
  const wordlistUrl = `${WORDLIST_BASEURL}?wordlength=${wordLength}`
  console.log("wordlistUrl", wordlistUrl)

  const { data: wordlist } = useSWR(wordlistUrl, clientSideFetcher, { 
    fallbackData: staticWordlist,
    revalidateIfStale: true // set to false for testing
  })
  
  useEffect(()=>{
    if(!wordlist){
      setWord("no word list")
      return
    }
    const theWord = generateRandomWord()
    console.log(`the word is ${theWord}, wordlist.length = ${wordlist.length}`)
    setWord(theWord)
  }, [wordlist]) // a little hacky but a faster compare
  
  // if(error) return(
  //   <div className="error">
  //     <p className="error-message">Error: failed to load wordlist</p>
  //     <p>Detail: useSWR error - {JSON.stringify(error)}</p>
  //   </div>
  // )

  // if(!wordList) return <div>loading wordlist...</div>

  const wordLengthToggler = () => {
    wordLength < MAX_WORD_LENGTH ?
       setWordLength( wordLength + 1) :
       setWordLength( MIN_WORD_LENGTH ) ;
  }
  

  const generateRandomWord = () => {
    const min = 0;
    const max =  wordlist.length -1;
    const rand =  Math.floor(Math.random() * (max - min + 1) + min)
    const theWord = wordlist[rand]
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
          wordList={wordlist}
          showHints={showHints}
          setShowHints={setShowHints}
          setWordLength={setWordLength}
      />
    </>
  );
}


const staticFetcher = async () => {
  const url = `${WORDLIST_BASEURL}?wordlength=${DEFAULT_WORD_LENGTH}`
  const res = await fetch(url)
  
  if(!res.ok){
    throw new Error(`${context.resolvedUrl} getStaticProps could not fetch ${url}`)
  }

  const data = await res.json()
  console.log(`staticFetcher fetched ${data.length} words`)

  return new Wordlist(...data) 
}

// Send the wordList to props
export async function getServerSideProps(context) { 

  const staticWordlist = await staticFetcher(context)
    .catch( err => {
      return { notFound: true }
    })

  // By returning { props: { wordList } }, the component
  // will receive `wordList` as a prop at build time
  const props = { staticWordlist}
  return { props }
}

export default Index;