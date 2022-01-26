import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap';
import wordList from '../../FiveLetterWords.json'
import { getHints } from './HintHelpers'
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameboardState}){

    const [hints, setHints] = useState()

    useEffect( () => {
      const hints = getHints(wordList, gameboardState.chars, 80)
      setHints(hints)
    }, [gameboardState])

    return (
      <Row>
        <Col> 
        <InfoBox>
            <span>Hints:</span>
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
  font-size: 12px;
  overflow: hidden;
  margin-bottom: 12px;
`

HintPanel.propTypes = {
  gameboardState: PropTypes.object.isRequired
}

export default HintPanel