import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap';
import { getHints } from './HintHelpers'
import { MAX_HINTS } from '../../next.config';
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameboardState, wordList}){

    const [hints, setHints] = useState()
    const [hintInfo, setHintInfo] = useState()

    useEffect( () => {
      const [hintInfo, hints] = getHints(wordList, gameboardState.chars, MAX_HINTS)
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
  height: 12rem;
  padding: 5px 10px;
`

HintPanel.propTypes = {
  gameboardState: PropTypes.object.isRequired
}

export default HintPanel