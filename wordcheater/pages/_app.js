import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import HelpModal from "../components/HelpModal"
import MainHead from "../components/MainHead"

export default function Home({ Component, wordList }) {
  useEffect(() => {
    console.log(wordList);
  }, []);


  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [showHints, setShowHints] = useState(false); // runs at server render

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
      <NavBar
        modalToggler={modalToggler}
        hintToggler={hintToggler}
        themeToggler={themeToggler}
      />
      <HelpModal 
        modalToggler={modalToggler} />

        {/* THIS IS THE INDEX PAGE!! */}
      <Component 
        theme={theme}
        showHints={showHints}
        setShowHints={setShowHints}
        />
        {/* THIS IS THE INDEX PAGE!! */}

    </div>
  );
}
