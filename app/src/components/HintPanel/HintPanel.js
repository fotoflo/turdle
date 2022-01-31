import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap';
import wordList from '../../FiveLetterWords.json'
import { getHints } from './HintHelpers'
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameboardState}){

    const [hints, setHints] = useState()
    const [hintInfo, setHintInfo] = useState()

    useEffect( () => {
      const [hintInfo, hints] = getHints(wordList, gameboardState.chars, 50)
      setHints(hints)
      setHintInfo(hintInfo)
    }, [gameboardState])

    return (
      <Row>
        <Col> 
        <InfoBox>
            <p><strong>Hints {hintInfo}: </strong>{hints}</p>
        </InfoBox>
        </Col>
      </Row>
    )
}

const InfoBox = styled.div`
  border: 1px solid grey;
  background-color: ${props => props.theme.InfoBGColor};
  font-size: 12px;
  overflow: none;
  margin-bottom: 12px;
  height: 8rem;
  padding: 5px 10px;
`

HintPanel.propTypes = {
  gameboardState: PropTypes.object.isRequired
}

export default HintPanel