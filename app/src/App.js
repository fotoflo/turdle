import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes";

import 'bootstrap/dist/css/bootstrap.min.css';

import { FaLightbulb, FaRegQuestionCircle } from 'react-icons/fa';

import {Navbar, Container} from 'react-bootstrap'

import ThemeToggleSwitch from './components/ThemeToggleSwitch';
import GameBoard from './components/GameBoard';

import wordList from './FiveLetterWords.json'


function App() {
  const [theme, setTheme] = useState("light");
  const [showHints, setShowHints] = useState(true);
  const [word, setWord] = useState("hello");

  useEffect( () => {
    const max = wordList.length
    const min = 1;

    const rand =  Math.floor(Math.random() * (max - min + 1) + min)
    setWord(wordList[rand])
  }, [])

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    console.log("toggling")
  };

  const hintToggler = () => {
    showHints === false ? setShowHints(true) : setShowHints(false);
    console.log("toggling")
  };
  
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
      <StyledApp>
        <StyledNavbar variant={theme} className="justify-content-between">
          <Container>
            <Navbar.Brand href="#home"><FaRegQuestionCircle /></Navbar.Brand>
          </Container>
          <Container>
            <Navbar.Brand href="#home">WordleSolver</Navbar.Brand>
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
