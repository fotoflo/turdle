import { useState } from "react";

import styles from "../styles/Home.module.css";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpModal from "../components/HelpModal"
import MainHead from "../components/MainHead"
import MainScript from "../components/MainScript"
import { darkTheme, GlobalStyles, lightTheme } from "../components/Themes";
import { ThemeProvider } from 'styled-components'
import { DEFAULT_SHOW_HINTS, DEFAULT_THEME } from "../next.config";

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showHints, setShowHints] = useState(DEFAULT_SHOW_HINTS); 

  const helpModalToggler = () => {
    showHelpModal === true ? setShowHelpModal(false): setShowHelpModal(true)
  };

  const hintToggler = () => {
    showHints === false ? setShowHints(true) : setShowHints(false);
    console.log("toggling")
  };

  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
    console.log("toggling")
  };


  return (
    <div className={styles.container}>
      <MainHead />
      <MainScript />

      <GlobalStyles theme={ theme == "light" ? lightTheme : darkTheme } />
      <HelpModal 
      helpModalToggler={helpModalToggler} 
        showHelpModal={showHelpModal}
      />

        {/* THIS IS THE INDEX PAGE!! */}
      <ThemeProvider theme={ theme == "light" ? lightTheme : darkTheme }>
        <Component   // see index.js
          theme={theme}
          themeToggler={themeToggler}
          helpModalToggler={helpModalToggler}
          showHelpModal={showHelpModal}
          showHints={showHints}
          setShowHints={setShowHints}
          hintToggler={hintToggler}
          {...pageProps} 
          />
          {/* THIS IS THE INDEX PAGE!! */}
      </ThemeProvider>

    </div>
  );
}