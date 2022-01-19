import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components'

import { Col, Row } from 'react-bootstrap';
import wordList from '../../FiveLetterWords.json'
import {filterWordList} from './HintHelpers'
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameState, keyboardState}){


    // const results = filterWordList(wordList, gameState, keyboardState)
    return (
      <Row>
        <Col> 
            <span>Hints:</span>
            {/* <span> {charInLocation.length} </span> */}
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