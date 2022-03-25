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
  DEFAULT_SHOW_DEBUG
} from "../next.config";

import { Wordlist } from "../components/GameBoard/Classes/Wordlist";
import Prompt from "../components/Prompt";

console.log({BASE_URL})
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
  fallback
}) {
  
 
  const [showWord] = useState(DEFAULT_SHOW_DEBUG);
  const [wordLength, setWordLength] = useState(DEFAULT_WORD_LENGTH);  
  const [level, setLevel] = useState(0);  

  const clientSideFetcher = async () => {
    const res = await fetch(`/api/wordlist?wordlength=${wordLength}`)
    const data = await res.json()
    console.log(`### clientSideFetcher feched ${data.length} ${data[0].length} letter words`)
    return new Wordlist(...data)
  }
  
  const key = level === 0 ? null : `/api/wordlist?wordlength=${wordLength}`;

  const { data: wordlist, mutate } = useSWR(
      key,
      clientSideFetcher, { 
    fallbackData: fallback['/api/wordlist'],
    revalidateIfStale: false, 
    revalidateOnMount: false,
    revalidateOnFocus: false
  })

  const [word, setWord] = useState( generateRandomWord(wordlist) );
  
  useEffect(()=>{
    mutate(key).then((wordlist)=>{
      if( !wordlist ) return
      setWord( generateRandomWord(wordlist) )
      console.log("### wordlist changed")
    })
  }, [level, wordLength])
  
  // if(error) return(
  //   <div className="error">
  //     <p className="error-message">Error: failed to load wordlist</p>
  //     <p>Detail: useSWR error - {JSON.stringify(error)}</p>
  //   </div>
  // )

  // if(!wordList) return <div>loading wordlist...</div>

  function wordLengthToggler(){
    console.log('wordLengthToggler')
    wordLength < MAX_WORD_LENGTH ?
       setWordLength( wordLength + 1) :
       setWordLength( MIN_WORD_LENGTH ) ;
  }
  

  function generateRandomWord(wordlist) {
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
        wordlist={wordlist}
        level={level}
      />

      <Prompt word={word} level={level} />

      <GameBoard 
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


export async function staticFetcher() {
  const url = `${WORDLIST_BASEURL}?wordlength=${DEFAULT_WORD_LENGTH}`
  const res = await fetch(url)
  
  if(!res.ok){
    throw new Error(`${context.resolvedUrl} getStaticProps could not fetch ${url}`)
  }

  const data = await res.json()
  console.log(`### staticFetcher fetched ${data.length} words`)

  return new Wordlist(...data) 
}

// Send the wordList to props
export async function getStaticProps(context) { 

  const staticWordlist = await staticFetcher(context)
    .catch( err => {
      return { notFound: true }
    })

  // By returning { props: { wordList } }, the component
  // will receive `wordList` as a prop at build time
  const props = { 
    fallback: {
      '/api/wordlist' : staticWordlist
    }
  }
  return { props }
}

export default Index;