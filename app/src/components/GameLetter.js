import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components'

import { Card, Col } from 'react-bootstrap';
// import {FaSignOutAlt} from 'react-icons/fa'

function GameLetter({order, activeLetter, setActiveLetter, gameState, setGameState } ){

    useEffect( () => { setActiveLetter(0) }, []);

    return (
      <Col onClick={ () => setActiveLetter(order) }>
        <LetterBox className="col" order={order} activeLetter={activeLetter}/>
        <span>{order}</span>
      </Col>
    )
    
}
    
const LetterBox = styled(Card)`
border: ${(props) => { return props.order === props.activeLetter ? 3 : 1 }}px solid ${(props) => { return props.order === props.activeLetter ? "red" : "grey" }};
height: 10rem;
`
    


GameLetter.propTypes = {
  order: PropTypes.number.isRequired,
  activeLetter: PropTypes.number.isRequired,
  setActiveLetter: PropTypes.func.isRequired,
  gameState: PropTypes.array.isRequired,
  setGameState: PropTypes.func.isRequired
  // user: PropTypes.shape({
  //   phoneNumber: null
  // })
}

export default GameLetter