import Head from 'next/head'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home( {wordList}) {

  useEffect(()=>{
    console.log(wordList)

  },[])

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
      <meta property="og:description" content="WordCheater helps you find 5 letter words!" />
    </Head>

      <main className={styles.main} wordList={wordList}>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
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