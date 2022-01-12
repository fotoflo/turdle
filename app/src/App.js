import React, { useState } from "react";
import './App.css';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./Themes";

import Letter from './components/Letter';
import ToggleSwitch from './components/ToggleSwitch';

const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

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
        <p>Hello world</p>
        <Letter str="World!"/>
        {/* <button onClick={() => themeToggler()}>Change Theme</button> */}
        <ToggleSwitch
          defaultValue={true}
          toggleFn={themeToggler}
        />
      </StyledApp>
    </ThemeProvider>
  );
}

export default App;
