import React, { useState } from "react";
import './App.css';
import styled, { ThemeProvider } from "styled-components";

import { lightTheme, darkTheme, GlobalStyles } from "./Themes";

import 'bootstrap/dist/css/bootstrap.min.css';

import { FaRegQuestionCircle } from 'react-icons/fa';

import {Navbar, Container} from 'react-bootstrap'

import ToggleSwitch from './components/ToggleSwitch';
import GameBoard from './components/GameBoard';

function App() {

  const [theme, setTheme] = useState("light");

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
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
            <ToggleSwitch
              defaultValue={true}
              toggleFn={themeToggler}
            />
          </Container>
        </StyledNavbar>
        <GameBoard />
      </StyledApp>
    </ThemeProvider>
  );
}

const StyledApp = styled.div`
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
