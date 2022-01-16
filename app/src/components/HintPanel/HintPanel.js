/*eslint no-unused-expressions: [2, { allowShortCircuit: true, allowTernary: true }]*/

import React from 'react';
import PropTypes, { object } from 'prop-types';
// import styled from 'styled-components'

import { Col, Row } from 'react-bootstrap';
import wordList from '../../FiveLetterWords.json'
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameState, keyboardState}){


    const results = "trying again"
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