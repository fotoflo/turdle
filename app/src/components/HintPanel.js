/*eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }]*/

import React from 'react';
import PropTypes, { object } from 'prop-types';
// import styled from 'styled-components'

import { Col, Row } from 'react-bootstrap';
import wordList from './FiveLetterWords.json'
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameState, keyboardState}){

    // not in set
    // get all the keyboard state 1's (doesn't contain)
    const notInSet = Object.entries(keyboardState)
      .filter( letterCount => letterCount[1] === 1 ) // [t, 1] get all entries with 1
      .map( letterCount => letterCount[0] )  //  [t, 1] return t
      .join('') // join 
    
      console.log(`notInSet: `, notInSet )

    // in set
    // get all the keyboard state 2's
    const inSet = Object.entries(keyboardState)
      .filter( letterCount => letterCount[1] === 2 ) // [t, 2] get all entries with 2
      .map( letterCount => letterCount[0] )  //  [t, 1] return t
      .join('') // join 
    console.log(`inSet: `, inSet )

    // letter in slot
    // get all the gamestate 3s 
    const inSlot = gameState
      .filter(gameLetter => Object.keys(gameLetter)[0] === 3 )
      .map( letterCount => letterCount[0] )  //  [t, 1] return t
      .join('') // join 

    // contains
    const inSetRegex = new RegExp(`[${inSet}]`)
    const withChar = wordList.filter( 
      word => word.match(inSetRegex)
    )

    // doesnt contain
    const notInSetRegex = new RegExp(`[${notInSet}]`)
    const withoutChar = withChar.filter( 
      word => !word.match(notInSetRegex)
    )
    
    const loc = 2;
    const char = 'u';

    const charInLocation = withoutChar.filter(
      (word) => word[loc] === char
    )

    const results = charInLocation.join(" ")

    return (
      <Row>
        <Col> 
            <span>Hints: {charInLocation.length}</span>
            <p>{results}</p>
        </Col>
      </Row>
    )
}


HintPanel.propTypes = {
  gameState: PropTypes.array.isRequired,
  keyboardState: PropTypes.object.isRequired,
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default HintPanel