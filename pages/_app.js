import { useState } from "react";
import styles from "../styles/Home.module.css";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HelpModal from "../components/HelpModal"
import MainHead from "../components/MainHead"

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [showHints, setShowHints] = useState(true); // runs at server render

  const modalToggler = () => {
    showModal === true ? setShowModal(false): setShowModal(true)
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
      <HelpModal 
        modalToggler={modalToggler} />

        {/* THIS IS THE INDEX PAGE!! */}
      <Component   // see index.js
        theme={theme}
        themeToggler={themeToggler}
        modalToggler={modalToggler}
        showHints={showHints}
        setShowHints={setShowHints}
        hintToggler={hintToggler}
        {...pageProps} 
        />
        {/* THIS IS THE INDEX PAGE!! */}

    </div>
  );
}