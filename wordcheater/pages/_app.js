import React, { useEffect, useState } from "react";
import Head from 'next/head'

import uuid from 'react-uuid'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import styled, { ThemeProvider } from "styled-components";

import {Navbar, Container} from 'react-bootstrap'
import { lightTheme, darkTheme, GlobalStyles } from "../components/Themes";
import { FaLightbulb, FaRegQuestionCircle } from 'react-icons/fa';



import ThemeToggleSwitch from '../components/ThemeToggleSwitch';
import GameBoard from '../components/GameBoard';
import HelpModal from '../components/HelpModal';

import wordList from '../dictonaries/wordle-possible-answers.json'


function App() {
  const [word, setWord] = useState("hello");
  
  const [theme, setTheme] = useState("light");
  
  const [showModal, setShowModal] = useState(false);
  
  const [showHints, setShowHints] = useState(true); // runs at server render

  useEffect( () => { // runs on Client on load
    const hintsSetting = JSON.stringify(localStorage.getItem('showHints'))
    if(hintsSetting === null){
      localStorage.setItem('showHints', JSON.stringify(showHints))
    }else{
      setShowHints( (hintsSetting === '"true"')  )
    }
  }, [showHints])

  const hintToggler = () => {
    showHints === false ? setShowHints(true) : setShowHints(false);
    showHints === false ? localStorage.setItem('showHints',true) : localStorage.setItem('showHints',false);
    console.log("toggling")
  };


  useEffect( () => {
    const max = wordList.length
    const min = 1;

    const rand =  Math.floor(Math.random() * (max - min + 1) + min)
    console.log(`the word is ${wordList[rand]}`)
    setWord(wordList[rand])
  }, [])

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
          word={word}
          showHints={showHints}
          />
      </StyledApp>
    </ThemeProvider>
    </>
  );
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
