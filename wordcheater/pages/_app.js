import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import HelpModal from "../components/HelpModal"
import MainHead from "../components/MainHead"

import { getWordList } from "../appHelpers";

export default function App({ Component, pageProps }) {
  const [MIN_WORD_LENGTH, MAX_WORD_LENGTH] = [3, 10];

  const [theme, setTheme] = useState("light");
  const [showModal, setShowModal] = useState(false);
  const [showHints, setShowHints] = useState(false); // runs at server render

  const [wordLength, setWordLength] = useState(5);

  const [wordList, setWordList] = useState([]);

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

  const wordLengthToggler = () => {
    wordLength < MAX_WORD_LENGTH ?
       setWordLength( wordLength + 1) :
       setWordLength( MIN_WORD_LENGTH ) ;

    updateWordList()
  }

  useEffect( async () => {
    await updateWordList();
  }, [])


  const updateWordList = async () => {
    const tempList = await getWordList(wordLength)
    console.log(`appJs set the ${wordLength} letter word list`, wordList)
    setWordList(tempList)
    return tempList
  }
  // TODO - refactor to custom hook

  return (
    <div className={styles.container}>
      <MainHead />
      <NavBar
        modalToggler={modalToggler}
        hintToggler={hintToggler}
        themeToggler={themeToggler}
        wordLength={wordLength}
        wordLengthToggler={wordLengthToggler}
      />
      <HelpModal 
        modalToggler={modalToggler} />

        {/* THIS IS THE INDEX PAGE!! */}
      <Component 
        theme={theme}
        showHints={showHints}
        wordLength={wordLength}
        {...pageProps} 
        />
        {/* THIS IS THE INDEX PAGE!! */}

    </div>
  );
}