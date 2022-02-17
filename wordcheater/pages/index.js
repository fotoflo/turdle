import React, { useEffect, useState } from "react";
import Head from 'next/head'


import styled, { ThemeProvider } from "styled-components";

import {Navbar, Container} from 'react-bootstrap'
import { lightTheme, darkTheme, GlobalStyles } from "../components/Themes";
import { FaLightbulb, FaRegQuestionCircle } from 'react-icons/fa';

import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import GameBoard from '../components/GameBoard';

import HelpModal from '../components/HelpModal';


function App({wordList}) {
  console.log("wordList:", wordList)

  const [word, setWord] = useState("hello");
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [showHints, setShowHints] = useState(false); // runs at server render

  const hintToggler = () => {
    showHints === false ? setShowHints(true) : setShowHints(false);
    console.log("toggling")
  };

  useEffect( () => {
    const theWord = generateRandomWord()
    console.log(`the word is ${theWord}`)
    setWord(theWord)
  }, [])

  const generateRandomWord = ( ) => {
    const wordList = ["wordOne", "wordTwo"]
    const min = 0;
    const max =  wordList.length -1;
    const rand =  Math.floor(Math.random() * (max - min + 1) + min)
    const theWord = wordList[rand]
    return theWord
  }

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    console.log("toggling")
  };


  const modalToggler = () => {
    showModal === true ? setShowModal(false): setShowModal(true)
  };
  
  return (
    <>
    <Head>
      <title>WordCheater - The Wordle Solver</title>
    </Head>
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <HelpModal showModal={showModal} modalToggler={modalToggler} />
        <StyledNavbar variant={theme} className="justify-content-between">
          <Container>
            <Navbar.Brand onClick={modalToggler}><FaRegQuestionCircle /></Navbar.Brand>
          </Container>
          <Container>
            <Navbar.Brand href="#home">WordCheater</Navbar.Brand>
          </Container>
          <Container className="justify-content-end">
            <ThemeToggleSwitch
              defaultValue={true}
              toggleFn={themeToggler}
              />
            <HintToggler
              onClick={hintToggler}
              >
              <FaLightbulb />
            </HintToggler>
          </Container>
        </StyledNavbar>
        <GameBoard 
            wordList={wordList}
            word={word}
            showHints={showHints}
            setShowHints={setShowHints}
        />
      </StyledApp>
    </ThemeProvider>
    </>
  );
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('http://localhost:3000/api/wordlist?wordlength=5')
  const wordList = await res.json()

  console.log('wordList.length: ', wordList.length)
  // By returning { props: { wordList } }, the component
  // will receive `wordList` as a prop at build time
  return {
    props: {
      wordList,
    },
  }
}

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const HintToggler = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

const StyledNavbar = styled(Navbar)`
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  left: 50%;
  transform: translatex(-50%);
  width:80%;
  margin-bottom: 2rem;
`

export default App;