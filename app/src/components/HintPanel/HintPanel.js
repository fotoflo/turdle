import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Col, Row } from 'react-bootstrap';
import wordList from '../../FiveLetterWords.json'
import {filterWordList} from './HintHelpers'
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameboardState}){

    const [hints, setHints] = useState()

    // useEffect( () => {
    //   const hints = filterWordList(wordList)
    //   setHints(hints)
    // }, [gameboardState])

    return (
      <Row>
        <Col> 
        <InfoBox>
            <span>Hints:</span>
            {JSON.stringify(gameboardState)}
            <p>{hints}</p>
        </InfoBox>
        </Col>
      </Row>
    )
}

const InfoBox = styled.div`
  border: 1px solid grey;
  background-color: ivory;
  height: 8rem;
  font-size: 10px;
  overflow: hidden;
  margin-bottom: 12px;
`

HintPanel.propTypes = {
  gameboardState: PropTypes.object.isRequired
}

export default HintPanel