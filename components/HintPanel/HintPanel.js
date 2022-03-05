import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'
import { Col, Row } from 'react-bootstrap';
import { getHints } from './HintHelpers'
import { MAX_HINTS } from '../../next.config';
// import {FaSignOutAlt} from 'react-icons/fa'

function HintPanel({gameboardState, wordList, showHints}){

    const [hints, setHints] = useState()
    const [hintInfo, setHintInfo] = useState()
    
    const hintboxRef = useRef(null)
    const [hintboxHeight, setHintboxHeight] = useState(0)

    useEffect( () => {
      const {hintInfo, hintList} = getHints(wordList, gameboardState.chars)
      setHints(hintList)
      setHintInfo(hintInfo)
    }, [gameboardState])

    useEffect(() => {
      if(!hintboxRef.current) return 
      setHintboxHeight(hintboxRef.current.clientHeight)
    }, [hints])
    
    
    if(!showHints) return <></>
    
    return (
      <Row >
        <Col> 
        <InfoPanel hints={hints} hintboxHeight={hintboxHeight}>
            <p ref={hintboxRef}><strong>{hintInfo} </strong>{hints}</p>
        </InfoPanel>
        </Col>
      </Row>
    )
  }
  
const InfoPanel = styled.div`
  border: 1px solid grey;
  background-color: ${props => props.theme.InfoBGColor};
  font-size: 12px;
  overflow: none;
  margin-top: 12px;
  margin-bottom: 12px;
  height: ${ props => props.hintboxHeight + 15}px;
  padding: 5px 10px;
`

HintPanel.propTypes = {
  gameboardState: PropTypes.object.isRequired
}

export default HintPanel