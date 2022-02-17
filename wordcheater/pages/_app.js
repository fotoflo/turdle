import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "../components/NavBar";
import HelpModal from "../components/HelpModal"

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
      <Head>
        <meta charset="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Web site created using create-react-app"
        />
        <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
        {/* <!--
        manifest.json provides metadata used when your web app is installed on a
        user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
      --> */}
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        {/* <!--
        Notice the use of %PUBLIC_URL% in the tags above.
        It will be replaced with the URL of the `public` folder during the build.
        Only files inside the `public` folder can be referenced from the HTML.

        Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
        work correctly both with client-side routing and a non-root public URL.
        Learn how to configure a non-root public URL by running `npm run build`.
      --> */}
        <title>WordCheater - The Wordle Solver</title>
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />

        <meta property="og:title" content="WordCheater - The Wordle Solver" />
        <meta property="og:image" content="" />
        <meta
          property="og:description"
          content="WordCheater helps you find 5 letter words!"
        />
      </Head>
      <NavBar
        modalToggler={modalToggler}
        hintToggler={hintToggler}
        themeToggler={themeToggler}
      />
      <HelpModal 
        modalToggler={modalToggler} />
      <Component 
        theme={theme}
        showHints={showHints}
        setShowHints={setShowHints}
        />
    </div>
  );
}
