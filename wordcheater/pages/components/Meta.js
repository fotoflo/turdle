import React from 'react';
import { Head } from 'next/document'

// import { Col, Row, Button } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function Meta(){

    return (
      <Head>
        <title>WordCheater - The Wordle Solver</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="WordCheater - The Wordle Solver" />
        <meta property="og:image" content="%PUBLIC_URL%/assets/WordCheaterOgImg.jpg" />
        <meta property="og:description" content="WordCheater helps you find 5 letter words!" />
        <meta name="description" content="WordCheater helps you find 5 letter words!" />
      </Head>
    )
}

export default Meta